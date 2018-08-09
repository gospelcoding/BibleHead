import React from "react";
import { FlatList, View, Text } from "react-native";
import axios from "../../node_modules/axios";
import apiKey from "../../util/apiKey";
import I18n from "../../i18n/i18n";
import CommonStyles from "../../util/CommonStyles";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import PickerList from "../shared/PickerList";
import BiblesOrgApi from "../../util/BiblesOrgApi";
import { intArray } from "../../util/util";

export default class VersePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      verses: []
    };
  }

  chapter = () => {
    return this.props.navigation.getParam("chapter");
  };

  async componentDidMount() {
    const passage = await BiblesOrgApi.chapterText(this.chapter().id);
    const endVerseNum = parseInt(
      passage.end_verse_id.slice(passage.end_verse_id.lastIndexOf(".") + 1)
    );
    this.setState({
      passage: passage,
      verses: intArray(endVerseNum).map(num => num.toString())
    });
  }

  static navigationOptions = () => {
    return {
      headerTitle: I18n.t("Verse")
    };
  };

  render() {
    return (
      <PickerList
        data={this.state.verses}
        keyExtractor={verse => verse}
        itemPress={verse => {
          this.props.navigation.navigate("VersePreview", {
            passage: this.state.passage,
            verse: verse
          });
        }}
        itemText={verse => verse}
      />
    );
  }
}
