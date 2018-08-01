import React from "react";
import { Text, View, Button, Platform, StyleSheet } from "react-native";
import { shuffle } from "../../util/util";
import ButtonRow from "./ButtonRow";
import PropTypes from "prop-types";

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
    this.takeStep(2);
  };

  bigStep = () => {
    this.takeStep(6);
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.hideWordsText}>
            {this.state.peek ? this.props.verse.text : this.state.gameText}
          </Text>
        </View>
        <ButtonRow
          game="HideWords"
          done={this.state.done}
          setPeek={() => this.setState({ peek: true })}
          cancelPeek={() => {
            this.setState({ peek: false });
          }}
          normalStep={this.normalStep}
          bigStep={this.bigStep}
          replay={this.replay}
          goHome={this.props.goHome}
          markLearned={this.props.markLearned}
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
  hideWordsText: {
    fontFamily: Platform.OS == "ios" ? "Menlo" : "monospace"
  }
});

HideWordsGame.propTypes = {};
