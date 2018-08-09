import React from "react";
import {
  SafeAreaView,
  Text,
  SectionList,
  StyleSheet,
  Platform
} from "react-native";
import VerseStorage from "../../models/VerseStorage";
import Verse from "../../models/Verse";
import ListItem from "./ListItem";
import update from "immutability-helper";
import SectionHeader from "./SectionHeader";
import I18n from "../../i18n/i18n";
import BHStatusBar from "../shared/BHStatusBar";
import CommonStyles from "../../util/CommonStyles";
import BHActionButton from "../shared/BHActionButton";

export default class VerseList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      learningList: [],
      reviewingList: [],
      loading: true,
      selectedId: null
    };
  }

  getVerses = () => {
    VerseStorage.getAllVerses().then(verseList => {
      const lists = Verse.getLearningAndReviewingLists(verseList);
      this.setState({
        learningList: lists.learning,
        reviewingList: lists.reviewing,
        loading: false
      });
    });
  };

  componentDidMount() {
    this.getVerses();
    this.props.navigation.setParams({ addVerse: this.addVerseAndSave });
  }

  practiceVerse = verse => {
    this.props.navigation.navigate("VersePractice", {
      verse: verse,
      updateVerse: this.updateVerseAndSave
    });
  };

  doReview = () => {
    const versesToReview = Verse.selectReviewVerses(
      this.state.reviewingList,
      5
    );
    this.props.navigation.navigate("VerseReview", {
      verses: versesToReview,
      updateVerse: this.updateVerseAndSave
    });
  };

  toggleSelect = verse => {
    this.setState(prevState => {
      const selectedId = prevState.selectedId == verse.id ? null : verse.id;
      return { selectedId: selectedId };
    });
  };

  addVerse = verse => {
    this.setState(prevState => {
      const listName = verse.learned ? "reviewingList" : "learningList";
      const list = prevState[listName];
      let index = list.findIndex(v => {
        return Verse.compare(verse, v) < 0;
      });
      if (index == -1) index = list.length;
      const newList = update(list, {
        $splice: [[index, 0, verse]]
      });
      return { [listName]: newList };
    });
  };

  addVerseAndSave = async verse => {
    verse = await VerseStorage.createVerse(verse);
    this.addVerse(verse);
    this.toggleSelect(verse);
  };

  updateVerse = (verse, mergeVerse) => {
    if (this.needToMoveVerse(mergeVerse)) {
      this.updateVerseAndMove(verse, mergeVerse);
    } else {
      this.setState(prevState => {
        const whichList = verse.learned ? "reviewingList" : "learningList";
        const list = prevState[whichList];
        const index = list.findIndex(item => {
          return item.id == verse.id;
        });
        // TODO - handle unlikely case of index==-1
        const newList = update(list, { [index]: { $merge: mergeVerse } });
        return {
          [whichList]: newList
        };
      });
    }
  };

  needToMoveVerse(mergeVerse) {
    return (
      mergeVerse.learned !== undefined ||
      mergeVerse.bookId ||
      mergeVerse.startChapter ||
      mergeVerse.startVerse
    );
  }

  updateVerseAndMove = (verse, mergeVerse) => {
    this.removeVerse(verse);
    const newVerse = update(verse, { $merge: mergeVerse });
    this.addVerse(newVerse);
  };

  removeVerse = verse => {
    this.setState(prevState => {
      const listName = verse.learned ? "reviewingList" : "learningList";
      const list = prevState[listName];
      const index = list.findIndex(v => {
        return v.id == verse.id;
      });
      const newList = update(list, {
        $splice: [[index, 1]]
      });
      return { [listName]: newList };
    });
  };

  updateVerseAndSave = (verse, mergeVerse) => {
    this.updateVerse(verse, mergeVerse);
    VerseStorage.updateVerse(verse, mergeVerse);
  };

  static navigationOptions = ({ navigation }) => {
    return {
      ...CommonStyles.headerOptions,
      headerTitle: I18n.t("MyVerses"),
      headerRight: (
        <BHActionButton
          onPress={() => {
            navigation.navigate("LanguageList", {
              addVerse: navigation.getParam("addVerse")
            });
          }}
          name="add"
        />
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <BHStatusBar />
        {this.state.loading && <Text>Loading...</Text>}
        <SectionList
          style={styles.list}
          sections={[
            { title: I18n.t("Learning"), data: this.state.learningList },
            {
              title: I18n.t("Reviewing"),
              reviewButton: true,
              data: this.state.reviewingList
            }
          ]}
          keyExtractor={verse => `${verse.id}`}
          renderSectionHeader={({ section: { title, reviewButton } }) => (
            <SectionHeader
              title={title}
              reviewButton={reviewButton}
              doReview={this.doReview}
            />
          )}
          renderItem={({ item: verse }) => {
            return (
              <ListItem
                verse={verse}
                selected={verse.id == this.state.selectedId}
                toggleSelect={this.toggleSelect}
                updateVerse={this.updateVerseAndSave}
                practiceVerse={this.practiceVerse}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    margin: Platform.OS == "ios" ? 0 : 8
  }
});
