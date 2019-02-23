import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, AsyncStorage } from "react-native";
import Verse from "../../models/Verse";
import HideWordsGame from "./HideWordsGame";
import CommonStyles from "../../util/CommonStyles";
import ShuffleWordsGame from "./ShuffleWordsGame";
import SwitchGameButton from "./SwitchGameButton";
import BHActionButton from "../shared/BHActionButton";
import update from "immutability-helper";

export default class VersePractice extends React.PureComponent {
  constructor(props) {
    super(props);
    const verse =
      this.props.navigation.getParam("verse") ||
      this.props.navigation.getParam("learningVerse");
    this.state = {
      game: "ShuffleWords",
      practiceParams: Verse.practiceParams(verse),
      verse: verse
    };
  }

  async componentDidMount() {
    const game =
      (await AsyncStorage.getItem("bh.versePracticeGame")) || "HideWords";
    this.setState({ game: game });
    this.props.navigation.setParams({
      game: game,
      switchGame: this.switchGame,
      practiceParams: this.state.practiceParams
    });
    const updateVerse = this.props.navigation.getParam("updateVerse");
    updateVerse(this.state.verse, { lastPracticed: new Date().getTime() });
  }

  switchGame = game => {
    this.setState({ game: game });
    this.props.navigation.setParams({ game: game });
    AsyncStorage.setItem("bh.versePracticeGame", game);
  };

  toggleLearned = () => {
    const change = this.state.verse.learned
      ? { learned: false }
      : Verse.markLearnedParams(this.state.verse);
    const newVerse = update(this.state.verse, { $merge: change });
    this.setState({ verse: newVerse });
    const updateVerse = this.props.navigation.getParam("updateVerse", () => {});
    updateVerse(this.state.verse, newVerse);
  };

  goHome = () => {
    this.props.navigation.navigate("VerseListScreen");
  };

  static navigationOptions = ({ navigation }) => {
    const verse =
      navigation.getParam("verse") || navigation.getParam("learningVerse");
    const splitProgress = navigation.getParam("practiceParams", {
      progress: ""
    }).progress;
    return {
      headerTitle: Verse.refText(verse) + " " + splitProgress,
      headerRight: (
        <SwitchGameButton
          game={navigation.getParam("game")}
          switchGame={navigation.getParam("switchGame", () => {})}
        />
      ),
      headerLeft: (
        <BHActionButton
          name="arrow-back"
          onPress={() => {
            navigation.navigate("VerseListScreen");
          }}
        />
      )
    };
  };

  GameComponent = game => {
    switch (game) {
      case "HideWords":
        return HideWordsGame;
      case "ShuffleWords":
        return ShuffleWordsGame;
    }
    return null;
  };

  render() {
    const Game = this.GameComponent(this.state.game);
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        {Game && (
          <Game
            verse={this.state.verse}
            goHome={this.goHome}
            toggleLearned={this.toggleLearned}
            practiceParams={this.state.practiceParams}
          />
        )}
      </SafeAreaView>
    );
  }
}

VersePractice.propTypes = {
  navigation: PropTypes.object.isRequired
};
