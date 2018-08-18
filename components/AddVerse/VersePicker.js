import React from "react";
import { SafeAreaView } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import PickerList from "../shared/PickerList";
import { intArray } from "../../util/util";

const verseNums = intArray(1, 200);

export default class VersePicker extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const verse = navigation.getParam("verse");
    return {
      title: `${verse.bookName} ${verse.startChapter}`
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <PickerList
          data={verseNums}
          keyExtractor={v => v.toString()}
          itemText={v => v.toString()}
          itemPress={v => {
            this.props.navigation.navigate("TextEntry", {
              saveVerse: this.props.navigation.getParam("addVerse"),
              verse: {
                ...this.props.navigation.getParam("verse"),
                startVerse: v
              }
            });
          }}
        />
      </SafeAreaView>
    );
  }
}
