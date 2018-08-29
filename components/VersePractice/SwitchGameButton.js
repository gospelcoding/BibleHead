import React from "react";
import { View, Image } from "react-native";
import XPlatformTouchable from "../shared/XPlatformTouchable";

export default function SwitchGameButton(props) {
  if (!props.game) return <View />;

  const buttonParams = getButtonParams(props.game);
  return (
    <View style={{ flexDirection: "row" }}>
      {buttonParams.map(params => (
        <View style={{ padding: 8 }} key={params.game}>
          <XPlatformTouchable onPress={() => props.switchGame(params.game)}>
            <Image source={params.imgSource} />
          </XPlatformTouchable>
        </View>
      ))}
    </View>
  );
}

function getButtonParams(currentGame) {
  let buttonParams = [];
  if (currentGame != "HideWords")
    buttonParams.push({
      game: "HideWords",
      imgSource: require("./hidewords.png")
    });
  if (currentGame != "ShuffleWords")
    buttonParams.push({
      game: "ShuffleWords",
      imgSource: require("./cards.png")
    });
  return buttonParams;
}
