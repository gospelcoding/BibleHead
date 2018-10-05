import React from "react";
import { SafeAreaView, Text, ScrollView, View, StyleSheet } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import update from "immutability-helper";
import Verse from "../../models/Verse";
import BHActionButton from "../shared/BHActionButton";
import i18n from "../../i18n/i18n";
import CheckBox from "react-native-checkbox";

export default class PassageSplitter extends React.PureComponent {
  constructor(props) {
    super(props);
    const verse = this.verse();
    const splits = generateSplits(verse);
    this.state = {
      splits: splits,
      currentSplit: verse.learned ? splits.length : verse.currentSplit || 0
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      save: this.save
    });
  }

  verse = () => {
    return this.props.navigation.getParam("verse");
  };

  save = () => {
    const updateVerse = this.props.navigation.getParam("updateVerse");
    updateVerse(this.verse(), {
      learned: this.state.currentSplit >= this.state.splits.length,
      splitIndices: getSplitIndices(this.state.splits),
      currentSplit: this.state.currentSplit
    });
    this.props.navigation.navigate("VerseList");
  };

  toggleSplitLearned = (splitNumber, prevLearned) => {
    this.setState({
      currentSplit: prevLearned ? splitNumber : splitNumber + 1
    });
  };

  wordPress = (splitIndex, wordIndex) => {
    this.setState(prevState => {
      if (wordIndex == 0 && splitIndex > 0) {
        let newSplits = update(prevState.splits, {
          [splitIndex - 1]: { $push: prevState.splits[splitIndex] }
        });
        newSplits = update(newSplits, { $splice: [[splitIndex, 1]] });
        return { splits: newSplits };
      }
      if (wordIndex > 0) {
        let newSplits = update(prevState.splits, {
          $splice: [
            [splitIndex + 1, 0, prevState.splits[splitIndex].slice(wordIndex)]
          ]
        });
        newSplits = update(newSplits, {
          [splitIndex]: {
            $set: prevState.splits[splitIndex].slice(0, wordIndex)
          }
        });
        return { splits: newSplits };
      }
    });
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: Verse.refText(navigation.getParam("verse")),
      headerRight: (
        <BHActionButton onPress={navigation.getParam("save")} name="check" />
      )
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <ScrollView style={{ flex: 1 }}>
          {this.state.splits.map((split, splitNumber) => (
            <View key={splitNumber.toString()} style={styles.split}>
              <View style={styles.splitHeader}>
                <Text style={styles.splitHeaderTitle}>
                  {i18n.t("Part") + " " + (splitNumber + 1)}
                </Text>
                <CheckBox
                  label={i18n.t("Learned")}
                  checked={this.state.currentSplit > splitNumber}
                  onChange={checked => {
                    this.toggleSplitLearned(splitNumber, checked);
                  }}
                />
              </View>
              <View style={styles.wordContainer}>
                {split.map((wordWithIndex, wordNumber) => (
                  <View
                    style={styles.word}
                    key={wordWithIndex.index.toString()}
                  >
                    <XPlatformTouchable
                      borderlessRipple={true}
                      onPress={() => {
                        this.wordPress(splitNumber, wordNumber);
                      }}
                    >
                      <View>
                        <Text>{wordWithIndex.word}</Text>
                      </View>
                    </XPlatformTouchable>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  split: {
    padding: 8
  },
  splitHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  splitHeaderTitle: {
    fontWeight: "bold"
  },
  wordContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8
  },
  word: {
    backgroundColor: "white",
    padding: 4,
    margin: 4,
    fontSize: 12
  }
});

function generateSplits(verse) {
  // if (!verse.splitIndices) splitIndices = [0];
  const splitIndices = verse.splitIndices ? verse.splitIndices : [0];
  return splitIndices.map((index, split) => {
    let splitText =
      split == splitIndices.length - 1
        ? verse.text.slice(index)
        : verse.text.slice(index, splitIndices[split + 1]);
    return wordsWithIndices(splitText, index);
  });
}

function wordsWithIndices(text, offset) {
  const pattern = /\S+/g;
  let wordsIndices = [];
  let find;
  while ((find = pattern.exec(text)) != null) {
    wordsIndices.push({
      word: find[0],
      index: find.index + offset
    });
  }
  return wordsIndices;
}

function getSplitIndices(splits) {
  return splits.map(wordsIndices => wordsIndices[0].index);
}
