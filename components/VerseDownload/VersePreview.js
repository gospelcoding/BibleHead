import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import BHButton from "../shared/BHButton";
import ThemeColors from "../../util/ThemeColors";
import PickerList from "../shared/PickerList";
import BiblesOrgApi from "../../util/BiblesOrgApi";

// Any tag other than p with its contents
const junkTag = /<[^p].*?>.+?<\/.+?>/g;
// Any XML open or close tag
const anyTag = /<.+?>/g;
// sup tag with class="v"
const verseTag = /<sup .*? class="v">1<\/sup>/;

function verseTagPattern(num) {
  return new RegExp('<sup .*? class="v">' + num + "<\\/sup>");
}

function verseText(text) {
  let newText = text.replace(junkTag, "");
  newText = newText.replace(anyTag, "");
  return newText.trim();
}

function verseText2(passage, startVerse, endVerse) {
  const startVersePattern = verseTagPattern(startVerse);
}

function verseReference() {
  return "yo";
}

export default class VersePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: verseText(this.verse().text),
      showEndVersePicker: false,
      endVerses: []
    };
  }

  async componentDidMount() {
    const verseNum = parseInt(this.verse().verse);
    let verses = await BiblesOrgApi.verses("eng-KJVA:1Cor.2");
    while (verseNum >= parseInt(verses[0].verse)) verses.shift();
    verses = verses.concat(await BiblesOrgApi.verses("eng-KJVA:1Cor.3"));
    this.setState({ endVerses: verses });
  }

  setEndVerse = endVerse => {
    let text = this.verse().text;
    let i = 0;
    while (this.state.endVerses[i] != endVerse) {
      text += this.state.endVerses[i].text;
      ++i;
    }
    text += endVerse.text;
    this.setState({
      text: verseText(text),
      endVerse: endVerse,
      showEndVersePicker: false
    });
  };

  verse = () => this.props.navigation.getParam("verse");
  // verse = () =>
  //   JSON.parse(
  //     ' {"reference": "1 Corinthians 2:1",  "text": "And I, brethren, when I came to you, came not with excellency of speech or of wisdom, declaring unto you the testimony of God.", "id": "eng-KJVA:1Cor.2.1"}'
  //   );

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("verse").reference
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <ScrollView style={{ flex: 1 }}>
          <View style={CommonStyles.textView}>
            <Text>{verseText(this.state.text)}</Text>
            <View
              style={{
                marginTop: 8,
                flexDirection: "row",
                justifyContent: this.state.endVerse
                  ? "space-between"
                  : "flex-end"
              }}
            >
              {this.state.endVerse && (
                <BHButton
                  title="Clear End Verse"
                  onPress={() => {
                    this.setState({
                      text: verseText(this.verse().text),
                      endVerse: undefined,
                      showEndVersePicker: false
                    });
                  }}
                  color={ThemeColors.red}
                />
              )}
              {this.state.showEndVersePicker ? (
                <BHButton
                  title="Cancel"
                  onPress={() => {
                    this.setState({ showEndVersePicker: false });
                  }}
                />
              ) : (
                <BHButton
                  title={
                    this.state.endVerse ? "Change End Verse" : "Add End Verse"
                  }
                  onPress={() => {
                    this.setState({ showEndVersePicker: true });
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {this.state.showEndVersePicker ? (
          <View style={{ flex: 2, marginTop: 8 }}>
            <PickerList
              data={this.state.endVerses}
              keyExtractor={verse => verse.id}
              itemPress={verse => this.setEndVerse(verse)}
              itemText={verse => verse.reference}
            />
          </View>
        ) : (
          <View style={{ padding: 8 }}>
            <BHButton
              title="Save"
              onPress={this.props.navigation.getParam("addVerse")}
              color={ThemeColors.buttonGreen}
              textStyle={{ fontSize: 20 }}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
