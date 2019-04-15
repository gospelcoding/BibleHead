import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Platform, FlatList } from "react-native";
import ListItem from "./ListItem";
import BHButton from "../shared/BHButton";
import I18n from "../../i18n/i18n";

const isIos = Platform.OS == "ios";

export default class VerseList extends React.PureComponent {
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
            extraData={this.props.selectedId}
            keyExtractor={verse => `${verse.id}`}
            renderItem={({ item: verse }) => {
              return (
                <ListItem
                  verse={verse}
                  selected={verse.id == this.props.selectedId}
                  toggleSelect={this.props.toggleSelect}
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
  selectedId: PropTypes.number, // Or null
  toggleSelect: PropTypes.func.isRequired,
  goToAddVerse: PropTypes.func.isRequired,
  updateVerse: PropTypes.func.isRequired,
  removeVerse: PropTypes.func.isRequired,
  editVerse: PropTypes.func.isRequired,
  practiceVerse: PropTypes.func.isRequired,
  openPassageSplitter: PropTypes.func.isRequired
};
