import React from "react";
import {
  SafeAreaView,
  Text,
  SectionList,
  StyleSheet,
  Platform,
  NativeModules,
  NativeEventEmitter
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
import UndoAlert from "../shared/UndoAlert";

const { AlarmModule } = NativeModules;
const alarmModuleEmitter = new NativeEventEmitter(AlarmModule);

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

  getVerses = async () => {
    const verseList = await VerseStorage.getAllVerses();
    const lists = Verse.getLearningAndReviewingLists(verseList);
    this.setState({
      learningList: lists.learning,
      reviewingList: lists.reviewing,
      loading: false
    });
    return lists;
  };

  async componentDidMount() {
    this.props.navigation.setParams({ addVerse: this.addVerseAndSave });
    const lists = await this.getVerses();
    if (this.props.navigation.getParam("action") == "review")
      this.doReview(lists.reviewing, lists.learning);
    this.subscription = alarmModuleEmitter.addListener("DoReview", () => {
      this.doReview(lists.reviewing, lists.learning);
    });
  }

  practiceVerse = verse => {
    this.props.navigation.navigate("VersePractice", {
      verse: verse,
      updateVerse: this.updateVerseAndSave
    });
  };

  editVerse = verse => {
    this.props.navigation.navigate("TextEntry", {
      verse: verse,
      saveVerse: mergeVerse => this.updateVerseAndSave(verse, mergeVerse)
    });
  };

  doReview = (reviewingList, learningList) => {
    let navParams = Verse.selectReviewVersesAndLearningVerse(
      this.state.reviewingList || reviewingList,
      this.state.learningList || learningList
    );
    navParams.updateVerse = this.updateVerseAndSave;
    if (navParams.reviewVerses.length > 0)
      this.props.navigation.navigate("VerseReview", navParams);
    else if (navParams.learningVerse)
      this.props.navigation.navigate("VersePractice", navParams);
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

  removeVerseAndSave = verse => {
    this.removeVerse(verse);
    VerseStorage.deleteVerse(verse.id);
    const undoTimerId = new Date().getTime();
    this.setState({ deletedVerse: verse, undoTimerId: undoTimerId });
    setTimeout(() => {
      this.setState(prevState => {
        return prevState.undoTimerId == undoTimerId
          ? { deletedVerse: undefined }
          : {};
      });
    }, 30000);
  };

  undoDelete = () => {
    const verse = this.state.deletedVerse;
    if (!verse) return;
    VerseStorage.restoreDeleted(verse.id);
    this.addVerse(verse);
    this.setState({ deletedVerse: undefined });
  };

  updateVerseAndSave = (verse, mergeVerse) => {
    this.updateVerse(verse, mergeVerse);
    VerseStorage.updateVerse(verse, mergeVerse);
  };

  openPassageSplitter = verse => {
    this.props.navigation.navigate("PassageSplitter", {
      verse: verse,
      updateVerse: this.updateVerseAndSave
    });
  };

  getSections = () => {
    let sections = [];
    if (this.state.learningList.length > 0)
      sections.push({
        title: I18n.t("Learning"),
        data: this.state.learningList
      });
    if (this.state.reviewingList.length > 0)
      sections.push({
        title: I18n.t("Reviewing"),
        reviewButton: true,
        data: this.state.reviewingList
      });
    return sections;
  };

  static navigationOptions = ({ navigation }) => {
    return {
      ...CommonStyles.headerOptions,
      headerTitle: I18n.t("MyVerses"),
      headerRight: (
        <BHActionButton
          onPress={() => {
            navigation.navigate("AddVerseMenu", {
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
        <SectionList
          style={styles.list}
          sections={this.getSections()}
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
                removeVerse={this.removeVerseAndSave}
                editVerse={this.editVerse}
                practiceVerse={this.practiceVerse}
                openPassageSplitter={this.openPassageSplitter}
              />
            );
          }}
        />
        {this.state.deletedVerse && (
          <UndoAlert
            message={I18n.t("VerseDeleted", {
              ref: Verse.refText(this.state.deletedVerse)
            })}
            undoAction={this.undoDelete}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    margin: Platform.OS == "ios" ? 0 : 8
  }
});
