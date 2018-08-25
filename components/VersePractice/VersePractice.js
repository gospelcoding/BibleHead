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

  componentDidMount() {
    const updateVerse = this.props.navigation.getParam("updateVerse");
    updateVerse(this.verse(), { lastPracticed: new Date().getTime() });
  }

  verse = () => {
    return (
      this.props.navigation.getParam("verse") ||
      this.props.navigation.getParam("learningVerse")
    );
  };

  markLearned = () => {
    const updateVerse = this.props.navigation.getParam("updateVerse", () => {});
    const verse = this.verse();
    updateVerse(verse, { learned: true });
    this.props.navigation.navigate("VerseList");
  };

  goHome = () => {
    this.props.navigation.navigate("VerseList");
  };

  static navigationOptions = ({ navigation }) => {
    const verse =
      navigation.getParam("verse") || navigation.getParam("learningVerse");
    return {
      headerTitle: Verse.refText(verse)
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        {this.state.game == "HideWords" && (
          <HideWordsGame
            verse={this.verse()}
            goHome={this.goHome}
            markLearned={this.markLearned}
          />
        )}
      </SafeAreaView>
    );
  }
}
