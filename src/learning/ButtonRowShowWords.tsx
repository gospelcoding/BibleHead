import React from 'react';
import {View} from 'react-native';
import BHButton from '../components/BHButton';
import {buttonRowStyles} from '../util/CommonStyles';

interface IProps {
  normalStep: () => void;
  bigStep: () => void;
  stepToEnd: () => void;
}

export default function ButtonRowShowWords(props: IProps) {
  return (
    <View style={buttonRowStyles.buttonRow}>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          title=">"
          buttonStyle={buttonRowStyles.button}
          textStyle={buttonRowStyles.buttonText}
          onPress={props.normalStep}
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          title=">>"
          buttonStyle={buttonRowStyles.button}
          textStyle={buttonRowStyles.buttonText}
          onPress={props.bigStep}
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          title=">|"
          buttonStyle={buttonRowStyles.button}
          textStyle={buttonRowStyles.buttonText}
          onPress={props.stepToEnd}
        />
      </View>
    </View>
  );
}
