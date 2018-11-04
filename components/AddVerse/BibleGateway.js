import React from "react";
import { WebView, SafeAreaView, Text } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import parsePassage from "./parsePassage";
import I18n from "../../i18n/i18n";
import Axios from "axios";
import BGPassageDisplay from "./BGPassageDisplay";

export default class BibleGateway extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  handleNavigationStateChange = navState => {
    if (navState.url.includes("?search=") && navState.url != this.lastUrl) {
      this.loadVersePage(navState.url);
      this.lastUrl = navState.url;
    }
  };

  loadVersePage = async url => {
    const response = await Axios.get(url);
    const passage = parsePassage(response.data);
    if (passage && passage.text) this.setState({ passage: passage });
  };

  saveVerse = () => {
    const verse = {
      text: this.state.passage.text,
      bookId: this.state.passage.bookId,
      ...this.state.passage.ref
    };
    const addVerse = this.props.navigation.getParam("addVerse");
    addVerse(verse);
    this.props.navigation.navigate("VerseList");
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: I18n.t("BibleGateway")
  });

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <WebView
          style={{ flex: 1 }}
          ref={ref => (this.webview = ref)}
          startInLoadingState={true}
          source={{ uri: "https://www.biblegateway.com/passage/" }}
          useWebKit
          onNavigationStateChange={this.handleNavigationStateChange}
          renderError={() => (
            <Text style={CommonStyles.textView}>
              {I18n.t("ConnectionError")}
            </Text>
          )}
        />
        {this.state.passage && (
          <BGPassageDisplay
            passage={this.state.passage}
            saveVerse={this.saveVerse}
          />
        )}
      </SafeAreaView>
    );
  }
}
