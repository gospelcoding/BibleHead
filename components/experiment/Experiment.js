import React from "react";
import {
  SafeAreaView,
  View,
  Button,
  TouchableWithoutFeedback,
  Text
} from "react-native";

export default class Experiment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { log: "" };
  }

  log = message => {
    this.setState(prevState => {
      const newLog = prevState.log + "\n" + message;
      return { log: newLog };
    });
  };

  render() {
    return (
      <SafeAreaView>
        <Button
          title="Button1"
          onPress={() => this.log("Pressed Button 1")}
          onPressIn={() => {
            this.log("Press In Button 1");
          }}
          onPressOut={() => {
            this.log("Press Out Button 1");
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            this.log("Pressed Touchable");
          }}
          onPressIn={() => {
            this.log("Pressed In Touchable");
          }}
        >
          <Button
            title="Button 2"
            onPress={() => {
              this.log("Pressed Button 2");
            }}
          />
        </TouchableWithoutFeedback>

        <Text>{this.state.log}</Text>
      </SafeAreaView>
    );
  }
}
