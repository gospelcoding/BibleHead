import React from "react";
import {
  WebView,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  Platform
} from "react-native";
import CommonStyles from "../../util/CommonStyles";
import parsePassage from "./parsePassage";
import BHButton from "../shared/BHButton";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";

const passageExtractCode =
  "var nodes; nodes = document.getElementsByClassName('passage-text'); if (nodes.length > 0) {window.postMessage(nodes[0].innerHTML);}";

const passageExtractCode2 =
  "document.getElementsByClassName('passage-text')[0].innerHTML='bye bye';";

const workAround1 =
  "window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');";

const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };

  window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = "(" + String(patchPostMessageFunction) + ")();";

function passageExtract() {
  alert("hi");
  var nodes;
  nodes = document.getElementsByClassName("passage-text");
  if (nodes.length > 0) {
    window.postMessage(nodes[0].innerHTML);
  }
}

export default class BibleGateway extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageLoadStart = () => {
    if (this.state.initialPageLoaded && !this.state.passage) {
      this.setState({ loading: true, passage: undefined });
    }
  };

  onPageLoad = () => {
    if (this.state.initialPageLoaded) {
      this.webview.injectJavaScript(passageExtractCode);
    } else {
      this.setState({ initialPageLoaded: true });
    }
  };

  handleMessage = e => {
    const passage = parsePassage(e.nativeEvent.data);
    if (passage && passage.text)
      this.setState({ passage: passage, loading: undefined });
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

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <WebView
          style={{ flex: 1 }}
          ref={ref => (this.webview = ref)}
          source={{ uri: "https://www.biblegateway.com/passage/" }}
          onLoadStart={this.onPageLoadStart}
          onLoad={this.onPageLoad}
          injectedJavaScript={patchPostMessageJsCode}
          onMessage={this.handleMessage}
        />
        {this.state.loading && (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              padding: 16
            }}
          >
            <ActivityIndicator />
            <Text style={{ fontSize: 20, paddingLeft: 8 }}>
              {I18n.t("GettingVerse")}
            </Text>
          </View>
        )}
        {this.state.passage && (
          <View
            style={{
              maxHeight: "50%",
              backgroundColor: "white",
              padding: 8,
              paddingBottom: 0,
              marginTop: 8
            }}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: 20,
                  paddingBottom: Platform.OS == "android" && 50
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {this.state.passage.refText + " "}
                </Text>
                {this.state.passage.text}
              </Text>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 8
              }}
            >
              <View
                style={Platform.select({
                  android: {
                    position: "absolute",
                    end: 16,
                    bottom: 16
                  }
                })}
              >
                <BHButton
                  title={I18n.t("Save")}
                  color={ThemeColors.buttonGreen}
                  onPress={this.saveVerse}
                  buttonStyle={Platform.OS == "android" ? { padding: 8 } : {}}
                />
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
