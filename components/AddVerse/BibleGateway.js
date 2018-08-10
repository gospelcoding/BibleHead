import React from "react";
import { WebView, SafeAreaView, Text, ScrollView } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import parsePassage from "./parsePassage";

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
  onPageLoad = () => {
    if (this.state.initialPageLoaded) {
      this.webview.injectJavaScript(passageExtractCode);
    } else {
      this.setState({ initialPageLoaded: true });
    }
  };

  handleMessage = e => {
    const passage = parsePassage(e.nativeEvent.data);
    if (passage && passage.text) this.setState({ passage: passage });
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <WebView
          style={{ flex: 1 }}
          ref={ref => (this.webview = ref)}
          source={{ uri: "https://www.biblegateway.com/passage/" }}
          onLoad={this.onPageLoad}
          injectedJavaScript={patchPostMessageJsCode}
          onMessage={this.handleMessage}
        />
        {this.state.passage && (
          <ScrollView style={{ flex: 1 }}>
            <Text>
              {this.state.passage.ref + "\n" + this.state.passage.text}
            </Text>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}
