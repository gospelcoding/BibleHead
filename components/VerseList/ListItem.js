import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Image
} from "react-native";
import Verse from "../../models/Verse";
import MarkUnlearnedButton from "./MarkUnlearnedButton";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";
import BHButton from "../shared/BHButton";
import BHActionButton from "../shared/BHActionButton";

const isIOS = Platform.OS == "ios";

export default function ListItem(props) {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <XPlatformTouchable
            onPress={() => {
              props.toggleSelect(props.verse);
            }}
          >
            <View style={styles.headerView}>
              <Text
                style={props.selected ? styles.selectedRefText : styles.refText}
              >
                {Verse.refText(props.verse)}
              </Text>
            </View>
          </XPlatformTouchable>
        </View>
        {props.selected && (
          <View style={{ flexDirection: "row" }}>
            <XPlatformTouchable
              onPress={() => props.openPassageSplitter(props.verse)}
            >
              <View
                style={{
                  padding: 8,
                  marginTop: isIOS ? 2 : 0
                }}
              >
                <Image source={require("./split.png")} />
              </View>
            </XPlatformTouchable>
            <BHActionButton
              name="create"
              color={ThemeColors.yellow}
              onPress={() => {
                props.editVerse(props.verse);
              }}
            />
            <BHActionButton
              name="trash"
              color={ThemeColors.red}
              onPress={() => {
                props.removeVerse(props.verse);
              }}
            />
          </View>
        )}
      </View>
      {props.selected && (
        <View style={styles.selectedView}>
          <ScrollView style={styles.verseTextScroll} nestedScrollEnabled={true}>
            <Text style={styles.verseText}>{props.verse.text}</Text>
          </ScrollView>
          <View
            style={[
              styles.buttonRow,
              {
                justifyContent: props.verse.learned
                  ? "space-between"
                  : "flex-end"
              }
            ]}
          >
            {props.verse.learned && (
              <MarkUnlearnedButton
                verse={props.verse}
                updateVerse={props.updateVerse}
                toggleSelect={props.toggleSelect}
              />
            )}
            <BHButton
              onPress={() => {
                props.practiceVerse(props.verse);
              }}
              title={I18n.t("Practice")}
            />
          </View>
        </View>
      )}
    </View>
  );
}

ListItem.propTypes = {
  toggleSelect: PropTypes.func.isRequired,
  verse: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  openPassageSplitter: PropTypes.func.isRequired,
  editVerse: PropTypes.func.isRequired,
  removeVerse: PropTypes.func.isRequired,
  updateVerse: PropTypes.func.isRequired,
  practiceVerse: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    marginBottom: isIOS ? 1 : 2
  },
  headerView: {
    padding: 8
  },
  selectedView: {
    padding: 8
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  refText: {
    fontSize: 24,
    color: "black"
  },
  selectedRefText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold"
  },
  verseTextScroll: {
    marginBottom: isIOS ? 0 : 8,
    maxHeight: 186
  },
  verseText: {
    fontSize: 18
  }
});
