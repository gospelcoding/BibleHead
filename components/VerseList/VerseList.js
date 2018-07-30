import React from "react";
import { SafeAreaView, Text, Button, FlatList } from "react-native";
import VerseStorage from "../../models/VerseStorage";
import Verse from "../../models/Verse";

export default class VerseList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      versesData: [],
      loading: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "BibleHead",
      headerRight: (
        <Button
          title="New"
          onPress={() => {
            navigation.navigate("NewVerseForm");
          }}
        />
      )
    };
  };

  refresh = () => {
    VerseStorage.getAllVerses().then(verseList => {
      this.setState({ versesData: verseList, loading: false });
    });
  };

  componentDidMount() {
    this.refresh();
    this._subscribe = this.props.navigation.addListener(
      "didFocus",
      this.refresh
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {this.state.loading && <Text>Loading...</Text>}
        <FlatList
          data={this.state.versesData}
          keyExtractor={verse => `${verse.id}`}
          renderItem={({ item: verse }) => {
            return <Text>{Verse.refText(verse)}</Text>;
          }}
        />
      </SafeAreaView>
    );
  }
}
