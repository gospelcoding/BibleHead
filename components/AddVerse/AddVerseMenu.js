import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import CommonStyles from "../../util/CommonStyles";
import ThemeColors from "../../util/ThemeColors";
import I18n from "../../i18n/i18n";

export default class AddVerseMenu extends React.PureComponent {
  static navigationOptions() {
    return {
      title: I18n.t("NewVerse")
    };
  }

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <View style={{ flex: 1 }}>
          <XPlatformTouchable
            style={{ flex: 1 }}
            borderlessRipple={true}
            onPress={() => {
              this.props.navigation.navigate("BookPicker", {
                addVerse: this.props.navigation.getParam("addVerse")
              });
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>{I18n.t("ManualEntry")}</Text>
            </View>
          </XPlatformTouchable>
        </View>

        <View style={styles.separator} />

        <View style={{ flex: 1 }}>
          <XPlatformTouchable
            style={{ flex: 1 }}
            borderlessRipple={true}
            onPress={() => {
              this.props.navigation.navigate("BibleGateway", {
                addVerse: this.props.navigation.getParam("addVerse")
              });
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>
                {I18n.t("DownloadFromBibleGateway")}
              </Text>
            </View>
          </XPlatformTouchable>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  menuItem: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  menuItemText: {
    fontSize: 40,
    textAlign: "center"
  },
  separator: {
    height: 2,
    backgroundColor: ThemeColors.grey
  }
});
