import React from "react";
import { Text, View, Button } from "react-native";
import { shuffle } from "../../util/util";

export default class HideWordsGame extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameText: props.verse.text,
      coordinates: getWordCoordinates(props.verse.text),
      step: 0
    };
  }

  normalStep = () => {
    this.setState(prevState => {
      return takeStep(
        prevState.gameText,
        prevState.coordinates,
        prevState.step,
        2
      );
    });
  };
  bigStep = () => {
    this.setState(prevState => {
      return takeStep(
        prevState.gameText,
        prevState.coordinates,
        prevState.step,
        6
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>{this.state.gameText}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Button title=">>" onPress={this.normalStep} />
          <Button title=">>>" onPress={this.bigStep} />
        </View>
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

function takeStep(gameText, coordinates, step, numberToStep) {
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
