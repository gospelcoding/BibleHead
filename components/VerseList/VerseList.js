import React from "react";
import { SafeAreaView, Text, Button, SectionList } from "react-native";
import VerseStorage from "../../models/VerseStorage";
import Verse from "../../models/Verse";
import ListItem from "./ListItem";
import update from "immutability-helper";

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
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.loading && <Text>Loading...</Text>}
        <SectionList
          sections={[
            { title: "Learning", data: this.state.learningList },
            { title: "Reviewing", data: this.state.reviewingList }
          ]}
          keyExtractor={verse => `${verse.id}`}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          renderItem={({ item: verse }) => {
            return (
              <ListItem
                verse={verse}
                selected={verse.id == this.state.selectedId}
                toggleSelect={this.toggleSelect}
                updateVerse={this.updateVerseAndSave}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "BibleHead",
      headerRight: (
        <Button
          title="New"
          onPress={() => {
            navigation.navigate("NewVerseForm");
          }}
        />
      )
    };
  };

  refresh = () => {
    VerseStorage.getAllVerses().then(verseList => {
      const lists = Verse.getLearningAndReviewingLists(verseList);
      this.setState({
        learningList: lists.learning,
        reviewingList: lists.reviewing,
        loading: false
      });
    });
  };

  // TODO do this different!!
  componentDidMount() {
    this.refresh();
    this._subscribe = this.props.navigation.addListener(
      "didFocus",
      this.refresh
    );
  }

  toggleSelect = verse => {
    if (!verse.text) this.loadVerseText(verse);
    this.setState(prevState => {
      const selectedId = prevState.selectedId == verse.id ? null : verse.id;
      return { selectedId: selectedId };
    });
  };

  loadVerseText = async verse => {
    const text = await VerseStorage.getVerseText(verse);
    this.updateVerse(verse, { text: text });
  };

  // TODO But what if the Reference changes? And therefore the sort order...
  updateVerse = (verse, mergeVerse) => {
    if (mergeVerse.learned !== undefined) {
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

  updateVerseAndMove = (verse, mergeVerse) => {
    this.setState(prevState => {
      const newVerse = update(verse, { $merge: mergeVerse });
      let newLists = {};
      const oldArray = verse.learned ? "reviewingList" : "learningList";
      const oldIndex = prevState[oldArray].findIndex(v => {
        return v.id == verse.id;
      });
      newLists[oldArray] = update(prevState[oldArray], {
        $splice: [[oldIndex, 1]]
      });

      const newArray = newVerse.learned ? "reviewingList" : "learningList";
      let newIndex = prevState[newArray].findIndex(v => {
        return Verse.compare(newVerse, v) < 0;
      });
      if (newIndex == -1) newIndex = prevState[newArray].length;
      newLists[newArray] = update(prevState[newArray], {
        $splice: [[newIndex, 0, newVerse]]
      });
      return newLists;
    });
  };

  updateVerseAndSave = (verse, mergeVerse) => {
    this.updateVerse(verse, mergeVerse);
    VerseStorage.updateVerse(verse, mergeVerse);
  };
}
