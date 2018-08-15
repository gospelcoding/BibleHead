import React from "react";
import { SafeAreaView } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import PickerList from "../shared/PickerList";
import { intArray } from "../../util/util";

const chapterNums = intArray(1, 150);

export default class ChapterPicker extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("verse").bookName
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <PickerList
          data={chapterNums}
          keyExtractor={c => c.toString()}
          itemText={c => c.toString()}
          itemPress={c => {
            this.props.navigation.navigate("VersePicker", {
              addVerse: this.props.navigation.getParam("addVerse"),
              verse: {
                ...this.props.navigation.getParam("verse"),
                startChapter: c
              }
            });
          }}
        />
      </SafeAreaView>
    );
  }
}
