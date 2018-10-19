import React from "react";
import { View, ScrollView, Text, Platform } from "react-native";
import BHButton from "../shared/BHButton";
import I18n from "../../i18n/i18n";
import ThemeColors from "../../util/ThemeColors";

export default function BGPassageDisplay(props) {
  return (
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
            {props.passage.refText + " "}
          </Text>
          {props.passage.text}
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
            color={ThemeColors.buttonBlueOrGreen}
            onPress={props.saveVerse}
            buttonStyle={Platform.OS == "android" ? { padding: 8 } : {}}
          />
        </View>
      </View>
    </View>
  );
}
