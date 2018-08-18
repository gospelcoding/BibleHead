import React from "react";
import { Text, View, Platform, StyleSheet, ScrollView } from "react-native";
import { shuffle } from "../../util/util";
import ButtonRow from "./ButtonRow";
import PropTypes from "prop-types";

const isIOS = Platform.OS == "ios";

export default class HideWordsGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameText: props.verse.text,
      coordinates: getWordCoordinates(props.verse.text),
      step: 0
    };
  }

  takeStep = numberOfSteps => {
    this.setState(prevState => {
      if (prevState.step >= prevState.coordinates.length) {
        return { done: true, gameText: this.props.verse.text };
      }
      return calculateStep(
        prevState.gameText,
        prevState.coordinates,
        prevState.step,
        numberOfSteps
      );
    });
  };

  normalStep = () => {
    this.takeStep(4);
  };

  bigStep = () => {
    this.takeStep(12);
  };

  replay = () => {
    this.setState({
      gameText: this.props.verse.text,
      coordinates: getWordCoordinates(this.props.verse.text),
      step: 0,
      done: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.hideWordsText}>
            {this.state.peek ? this.props.verse.text : this.state.gameText}
          </Text>
        </ScrollView>
        <ButtonRow
          game="HideWords"
          done={this.state.done}
          step={this.state.step}
          setPeek={() => this.setState({ peek: true })}
          cancelPeek={() => {
            this.setState({ peek: false });
          }}
          normalStep={this.normalStep}
          bigStep={this.bigStep}
          replay={this.replay}
          goHome={this.props.goHome}
          markLearned={this.props.markLearned}
          verseLearned={this.props.verse.learned}
        />
      </View>
    );
  }
}

function getWordCoordinates(text) {
  const pattern = /\w+/g;
  let coordinates = [];
  let find;
  while ((find = pattern.exec(text)) !== null) {
    coordinates.push([find.index, find[0].length]);
  }
  shuffle(coordinates);
  return coordinates;
}

function calculateStep(gameText, coordinates, step, numberToStep) {
  const stepTo = Math.min(step + numberToStep, coordinates.length);
  for (let s = step; s < stepTo; ++s) {
    let index = coordinates[s][0];
    let wordLength = coordinates[s][1];
    let dashes = new Array(wordLength).fill("-", 0, wordLength).join("");
    gameText =
      gameText.slice(0, index) + dashes + gameText.slice(index + wordLength);
  }
  return {
    gameText: gameText,
    step: stepTo
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isIOS ? "white" : undefined
  },
  hideWordsText: {
    fontFamily: isIOS ? "Menlo" : "monospace",
    fontSize: 24,
    padding: 8,
    backgroundColor: "white",
    margin: isIOS ? 0 : 8,
    elevation: isIOS ? 0 : 4
  }
});

HideWordsGame.propTypes = {};
