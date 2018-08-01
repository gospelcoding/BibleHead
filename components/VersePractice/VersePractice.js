import React from "react";
import { SafeAreaView } from "react-native";
import Verse from "../../models/Verse";
import HideWordsGame from "./HideWordsGame";

export default class VersePractice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      game: "HideWords"
    };
  }

  markLearned = () => {
    const updateVerse = this.props.navigation.getParam("updateVerse", () => {});
    const verse = this.props.navigation.getParam("verse", {});
    updateVerse(verse, { learned: true });
    this.props.navigation.goBack();
  };

  goHome = () => {
    this.props.navigation.goBack();
  };

  render() {
    const verse = this.props.navigation.getParam("verse", {});
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.game == "HideWords" && (
          <HideWordsGame
            verse={verse}
            goHome={this.goHome}
            markLearned={this.markLearned}
          />
        )}
      </SafeAreaView>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Verse.refText(navigation.getParam("verse", {}))
    };
  };
}
