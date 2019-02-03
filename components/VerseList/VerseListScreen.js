import React from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  NativeModules,
  NativeEventEmitter,
  BackHandler
} from "react-native";
import VerseStorage from "../../models/VerseStorage";
import Verse from "../../models/Verse";
import update from "immutability-helper";
import I18n from "../../i18n/i18n";
import BHStatusBar from "../shared/BHStatusBar";
import CommonStyles from "../../util/CommonStyles";
import UndoAlert from "../shared/UndoAlert";
import Settings from "../../util/Settings";
import { TabView, TabBar } from "react-native-tab-view";
import VerseList from "./VerseList";
import ThemeColors from "../../util/ThemeColors";
import { BHHeaderButtons, Item } from "../shared/BHHeaderButtons";

const { AlarmModule } = NativeModules;
const alarmModuleEmitter = new NativeEventEmitter(AlarmModule);

export default class VerseListScreen extends React.PureComponent {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      learningList: [],
      reviewingList: [],
      index: 0,
      routes: [
        { key: "learning", title: I18n.t("Learning") },
        { key: "reviewing", title: I18n.t("Reviewing") }
      ]
    };
    this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onBackButtonPressAndroid
      )
    );
  }

  getVerses = async () => {
    const verseList = await VerseStorage.getAllVerses();
    const lists = Verse.getLearningAndReviewingLists(verseList);
    this.setState({
      learningList: lists.learning,
      reviewingList: lists.reviewing
    });
    return lists;
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      addVerse: this.addVerseAndSave,
      reloadVerses: this.getVerses,
      doReview: this.doReview
    });
    const lists = await this.getVerses();
    if (this.props.navigation.getParam("action") == "review")
      this.doReview(lists.reviewing, lists.learning);
    this.subscription = alarmModuleEmitter.addListener("DoReview", () => {
      this.doReview(lists.reviewing, lists.learning);
    });
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  practiceVerse = verse => {
    this.props.navigation.navigate("VersePractice", {
      verse: verse,
      updateVerse: this.updateVerseAndSave
    });
  };

  editVerse = verse => {
    this.props.navigation.navigate("TextEntry", {
      verse: verse,
      saveVerse: mergeVerse => this.updateVerseAndSave(verse, mergeVerse)
    });
  };

  doReview = (reviewingList, learningList) => {
    let navParams = Verse.selectReviewVersesAndLearningVerse(
      this.state.reviewingList || reviewingList,
      this.state.learningList || learningList
    );
    navParams.updateVerse = this.updateVerseAndSave;
    if (navParams.reviewVerses.length > 0)
      this.props.navigation.navigate("VerseReview", navParams);
    else if (navParams.learningVerse)
      this.props.navigation.navigate("VersePractice", navParams);
  };

  addVerse = verse => {
    this.setState(prevState => {
      const listName = verse.learned ? "reviewingList" : "learningList";
      const list = prevState[listName];
      let index = list.findIndex(v => {
        return Verse.compare(verse, v) < 0;
      });
      if (index == -1) index = list.length;
      const newList = update(list, {
        $splice: [[index, 0, verse]]
      });
      return { [listName]: newList };
    });
  };

  addVerseAndSave = async verse => {
    verse = await VerseStorage.createVerse(verse);
    this.addVerse(verse);
    this.toggleSelect(verse); // TODO - fix this
  };

  updateVerse = (verse, mergeVerse) => {
    if (this.needToMoveVerse(mergeVerse)) {
      this.updateVerseAndMove(verse, mergeVerse);
    } else {
      this.setState(prevState => {
        const whichList = verse.learned ? "reviewingList" : "learningList";
        const list = prevState[whichList];
        const index = list.findIndex(item => {
          return item.id == verse.id;
        });
        // TODO - handle unlikely case of index==-1
        const newList = update(list, { [index]: { $merge: mergeVerse } });
        return {
          [whichList]: newList
        };
      });
    }
  };

  needToMoveVerse(mergeVerse) {
    return (
      mergeVerse.learned !== undefined ||
      mergeVerse.bookId ||
      mergeVerse.startChapter ||
      mergeVerse.startVerse
    );
  }

  updateVerseAndMove = (verse, mergeVerse) => {
    this.removeVerse(verse);
    const newVerse = update(verse, { $merge: mergeVerse });
    this.addVerse(newVerse);
  };

  removeVerse = verse => {
    this.setState(prevState => {
      const listName = verse.learned ? "reviewingList" : "learningList";
      const list = prevState[listName];
      const index = list.findIndex(v => {
        return v.id == verse.id;
      });
      const newList = update(list, {
        $splice: [[index, 1]]
      });
      return { [listName]: newList };
    });
  };

  removeVerseAndSave = verse => {
    this.removeVerse(verse);
    VerseStorage.deleteVerse(verse.id);
    const undoTimerId = new Date().getTime();
    this.setState({ deletedVerse: verse, undoTimerId: undoTimerId });
    setTimeout(() => {
      this.setState(prevState => {
        return prevState.undoTimerId == undoTimerId
          ? { deletedVerse: undefined }
          : {};
      });
    }, 30000);
  };

  undoDelete = () => {
    const verse = this.state.deletedVerse;
    if (!verse) return;
    VerseStorage.restoreDeleted(verse.id);
    this.addVerse(verse);
    this.setState({ deletedVerse: undefined });
  };

  updateVerseAndSave = (verse, mergeVerse) => {
    this.updateVerse(verse, mergeVerse);
    VerseStorage.updateVerse(verse, mergeVerse);
  };

  openPassageSplitter = verse => {
    this.props.navigation.navigate("PassageSplitter", {
      verse: verse,
      updateVerse: this.updateVerseAndSave
    });
  };

  getSections = () => {
    let sections = [];
    if (this.state.learningList.length > 0)
      sections.push({
        title: I18n.t("Learning"),
        data: this.state.learningList
      });
    if (this.state.reviewingList.length > 0)
      sections.push({
        title: I18n.t("Reviewing"),
        reviewButton: true,
        data: this.state.reviewingList
      });
    return sections;
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        backgroundColor: ThemeColors.blue
      },
      headerTitle: I18n.t("MyVerses"),
      headerRight: (
        <BHHeaderButtons overflowIconName="menu">
          <Item
            title={I18n.t("AddVerse")}
            onPress={() => goToAddVerse(navigation)}
            show="never"
          />
          <Item
            title={I18n.t("ReviewVerses")}
            onPress={navigation.getParam("doReview")}
            show="never"
          />
          <Item
            title={I18n.t("Preferences")}
            onPress={() =>
              navigation.navigate("SettingsView", {
                reloadVerses: navigation.getParam("reloadVerses")
              })
            }
            show="never"
          />
        </BHHeaderButtons>
      )
    };
  };

  functionsForVerseList = {
    toggleSelect: this.toggleSelect,
    updateVerse: this.updateVerseAndSave,
    removeVerse: this.removeVerseAndSave,
    editVerse: this.editVerse,
    practiceVerse: this.practiceVerse,
    openPassageSplitter: this.openPassageSplitter,
    goToAddVerse: () => goToAddVerse(this.props.navigation)
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <BHStatusBar />
        {this.state.reviewingList.length == 0 ? (
          <VerseList
            verses={this.state.learningList}
            {...this.functionsForVerseList}
          />
        ) : (
          <TabView
            navigationState={this.state}
            onIndexChange={index => this.setState({ index: index })}
            tabBarPosition="top"
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{ backgroundColor: ThemeColors.blue }}
              />
            )}
            renderScene={({ route }) => (
              <VerseList
                verses={
                  route.key == "learning"
                    ? this.state.learningList
                    : this.state.reviewingList
                }
                {...this.functionsForVerseList}
              />
            )}
          />
        )}

        {this.state.deletedVerse && (
          <UndoAlert
            message={I18n.t("VerseDeleted", {
              ref: Verse.refText(this.state.deletedVerse)
            })}
            undoAction={this.undoDelete}
          />
        )}
      </SafeAreaView>
    );
  }
}

async function goToAddVerse(navigation) {
  const settings = await Settings.readSettings();
  let screen = "AddVerseMenu";
  if (settings.newVerseMethod == "DownloadFromBibleGateway")
    screen = "BibleGateway";
  if (settings.newVerseMethod == "ManualEntry") screen = "BookPicker";
  navigation.navigate(screen, {
    addVerse: navigation.getParam("addVerse")
  });
}

VerseListScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
