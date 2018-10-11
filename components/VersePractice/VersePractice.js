import React from "react";
import { SafeAreaView, AsyncStorage } from "react-native";
import Verse from "../../models/Verse";
import HideWordsGame from "./HideWordsGame";
import CommonStyles from "../../util/CommonStyles";
import ShuffleWordsGame from "./ShuffleWordsGame";
import SwitchGameButton from "./SwitchGameButton";
import BHActionButton from "../shared/BHActionButton";

export default class VersePractice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      game: "ShuffleWords",
      practiceParams: Verse.practiceParams(this.verse())
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
    updateVerse(this.verse(), { lastPracticed: new Date().getTime() });
  }

  switchGame = game => {
    this.setState({ game: game });
    this.props.navigation.setParams({ game: game });
    AsyncStorage.setItem("bh.versePracticeGame", game);
  };

  verse = () => {
    return (
      this.props.navigation.getParam("verse") ||
      this.props.navigation.getParam("learningVerse")
    );
  };

  markLearned = () => {
    const updateVerse = this.props.navigation.getParam("updateVerse", () => {});
    const verse = this.verse();
    updateVerse(verse, Verse.markLearnedParams(verse));
    this.props.navigation.navigate("VerseList");
  };

  goHome = () => {
    this.props.navigation.navigate("VerseList");
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
          name="arrowBack"
          onPress={() => {
            navigation.navigate("VerseList");
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
            verse={this.verse()}
            goHome={this.goHome}
            markLearned={this.markLearned}
            practiceParams={this.state.practiceParams}
          />
        )}
      </SafeAreaView>
    );
  }
}
