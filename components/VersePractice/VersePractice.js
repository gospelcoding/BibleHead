import React from "react";
import { SafeAreaView } from "react-native";
import Verse from "../../models/Verse";
import HideWordsGame from "../VerseList/HideWordsGame";

export default class VersePractice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      game: "HideWords"
    };
  }

  render() {
    const verse = this.props.navigation.getParam("verse", {});
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.game == "HideWords" && <HideWordsGame verse={verse} />}
      </SafeAreaView>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Verse.refText(navigation.getParam("verse", {}))
    };
  };
}
