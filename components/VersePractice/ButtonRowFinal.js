import React from "react";
import { View } from "react-native";
import BHIconButton from "../shared/BHIconButton";
import ThemeColors from "../../util/ThemeColors";
import I18n from "../../i18n/i18n";
import BHButton from "../shared/BHButton";

export default function ButtonRowFinal(props) {
  return (
    <View style={props.style}>
      <View style={props.buttonContainerStyle}>
        <BHIconButton
          name="replay"
          size={36}
          onPress={props.replay}
          buttonStyle={props.buttonStyle}
          textStyle={props.iconButtonTextStyle}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        <BHIconButton
          name="home"
          size={36}
          onPress={props.goHome}
          buttonStyle={props.buttonStyle}
          textStyle={props.iconButtonTextStyle}
        />
      </View>
      <View style={props.buttonContainerStyle}>
        {!props.verseLearned && (
          <BHButton
            title={I18n.t("Learned")}
            color={ThemeColors.buttonGreen}
            onPress={props.markLearned}
            buttonStyle={props.buttonStyle}
            textStyle={[props.buttonTextStyle, { fontSize: 20 }]}
          />
        )}
      </View>
    </View>
  );
}
