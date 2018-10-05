import React from "react";
import { Text, Platform, View, ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ButtonRow from "./ButtonRow";
import ButtonWords from "./ButtonWords";
import { randInt } from "../../util/util";
import update from "immutability-helper";
import CommonStyles from "../../util/CommonStyles";

const isIOS = Platform.OS == "ios";
const numberOfButtons = 12;

export default class ShuffleWordsGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.freshState(props);
  }

  freshState = props => {
    let state = makeShuffleWordsGame(props.practiceParams.text);
    state.step = 0;
    state.gameText = "";
    state.redButtons = [];
    state.hidButtons = [];
    state.done = false;
    return state;
  };

  replay = () => {
    this.setState(this.freshState(this.props.verse));
  };

  buttonWordPress = (word, buttonWordIndex) => {
    if (word === this.state.wordsWithIndices[this.state.step].word)
      this.advance(buttonWordIndex);
    else
      this.setState(prevState => ({
        redButtons: update(prevState.redButtons, { $push: [buttonWordIndex] })
      }));
  };

  advance = buttonWordIndex => {
    this.setState(prevState => {
      const nextStep = prevState.step + 1;
      if (nextStep == prevState.wordsWithIndices.length)
        return {
          done: true,
          gameText: this.props.practiceParams.text
        };
      let nextState = {
        step: nextStep,
        gameText: this.props.practiceParams.text.slice(
          0,
          prevState.wordsWithIndices[nextStep].index
        ),
        redButtons: []
      };
      if (prevState.shuffledWords.length >= nextStep + numberOfButtons) {
        let newWord = prevState.shuffledWords[nextStep + numberOfButtons - 1];
        nextState.buttonWords = update(prevState.buttonWords, {
          [buttonWordIndex]: { $set: newWord }
        });
      } else {
        nextState.hidButtons = update(prevState.hidButtons, {
          $push: [buttonWordIndex]
        });
      }
      return nextState;
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} containerContentStyle={{ flexGrow: 1 }}>
          {!!this.props.practiceParams.prompt && (
            <Text style={styles.promptText}>
              {this.props.practiceParams.prompt}
            </Text>
          )}
          <Text style={[CommonStyles.textView]}>{this.state.gameText}</Text>
        </ScrollView>
        {this.state.done ? (
          <ButtonRow
            done={true}
            replay={this.replay}
            goHome={this.props.goHome}
            markLearned={this.props.markLearned}
            verseLearned={this.props.verse.learned}
          />
        ) : (
          <ButtonWords
            buttonWords={this.state.buttonWords}
            buttonWordPress={this.buttonWordPress}
            redButtons={this.state.redButtons}
            hidButtons={this.state.hidButtons}
          />
        )}
      </View>
    );
  }
}

function makeShuffleWordsGame(text) {
  const wordsWithIndices = getWords(text);
  const shuffledWords = shuffle(wordsWithIndices);
  const buttonWords = shuffledWords.slice(0, numberOfButtons);
  return {
    wordsWithIndices: wordsWithIndices,
    shuffledWords: shuffledWords,
    buttonWords: buttonWords
  };
}

function getWords(text) {
  const pattern = /\S+/g;
  let wordsWithIndices = [];
  let find;
  while ((find = pattern.exec(text)) !== null) {
    wordsWithIndices.push({
      word: find[0],
      index: find.index
    });
  }

  const startPunctuation = /^[.,:;?¿!¡"“”‘’«»()]+/;
  const endPunctuation = /[.,:;?¿!¡"“”‘’«»()]+$/;
  for (let wordObj of wordsWithIndices) {
    wordObj.word = wordObj.word
      .replace(startPunctuation, "")
      .replace(endPunctuation, "")
      .toUpperCase();
  }

  return wordsWithIndices;
}

function shuffle(wordsWithIndices) {
  let shuffledWords = wordsWithIndices.map(wordObj => wordObj.word);
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    let swapIndex = i - randInt(Math.min(numberOfButtons, i + 1));
    let swapMe = shuffledWords[i];
    shuffledWords[i] = shuffledWords[swapIndex];
    shuffledWords[swapIndex] = swapMe;
  }
  return shuffledWords;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isIOS ? "white" : undefined
  },
  promptText: {
    fontSize: 18,
    padding: 8,
    marginHorizontal: isIOS ? 0 : 8
  }
});
