import React from "react";
import { SafeAreaView } from "react-native";
import Verse from "../../models/Verse";
import HideWordsGame from "./HideWordsGame";
import CommonStyles from "../../util/CommonStyles";

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

  static navigationOptions = ({ navigation }) => {
    return {
      ...CommonStyles.headerOptions,
      headerTitle: Verse.refText(navigation.getParam("verse", {}))
    };
  };

  render() {
    const verse = this.props.navigation.getParam("verse", {});
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
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
}
