import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Platform, FlatList } from "react-native";
import ListItem from "./ListItem";
import { AndroidBackHandler } from "react-navigation-backhandler";
import BHButton from "../shared/BHButton";
import I18n from "../../i18n/i18n";

const isIos = Platform.OS == "ios";

export default class VerseList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null
    };
  }

  toggleSelect = verse => {
    this.setState(prevState => {
      const selectedId = prevState.selectedId == verse.id ? null : verse.id;
      return { selectedId: selectedId };
    });
  };

  render() {
    return (
      <View>
        {this.props.verses.length == 0 ? (
          <View style={styles.addButtonContainer}>
            <BHButton
              title={I18n.t("AddVerse")}
              onPress={this.props.goToAddVerse}
            />
          </View>
        ) : (
          <FlatList
            style={styles.list}
            data={this.props.verses}
            extraData={this.state.selectedId}
            keyExtractor={verse => `${verse.id}`}
            renderItem={({ item: verse }) => {
              return (
                <ListItem
                  verse={verse}
                  selected={verse.id == this.state.selectedId}
                  toggleSelect={this.toggleSelect}
                  updateVerse={this.props.updateVerse}
                  removeVerse={this.props.removeVerse}
                  editVerse={this.props.editVerse}
                  practiceVerse={this.props.practiceVerse}
                  openPassageSplitter={this.props.openPassageSplitter}
                />
              );
            }}
          />
        )}
        <AndroidBackHandler
          onBackPress={() => {
            if (this.state.selectedId) {
              this.setState({ selectedId: null });
              return true;
            }
            return false; // Default back button behavior
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: isIos ? 0 : 8
  },
  addButtonContainer: {
    alignItems: "center",
    paddingTop: 40
  }
});

VerseList.propTypes = {
  verses: PropTypes.array.isRequired,
  goToAddVerse: PropTypes.func.isRequired,
  updateVerse: PropTypes.func.isRequired,
  removeVerse: PropTypes.func.isRequired,
  editVerse: PropTypes.func.isRequired,
  practiceVerse: PropTypes.func.isRequired,
  openPassageSplitter: PropTypes.func.isRequired
};
