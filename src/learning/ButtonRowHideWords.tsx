import React from 'react';
import {View, Button} from 'react-native';
import PropTypes from 'prop-types';
import PeekButton from './PeekButton';
import {buttonRowStyles} from '../util/CommonStyles';
import BHButton from '../components/BHButton';

interface IProps {
  step: number;
  setPeek: () => void;
  cancelPeek: () => void;
  normalStep: () => void;
  bigStep: () => void;
}

export default function ButtonRowHideWords(props: IProps) {
  return (
    <View style={buttonRowStyles.buttonRow}>
      <View style={buttonRowStyles.buttonContainer}>
        <PeekButton
          step={props.step}
          setPeek={props.setPeek}
          cancelPeek={props.cancelPeek}
          // button={props.button}
          // textStyle={buttonRowStyles.iconButtonText}
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          title=">>"
          // buttonStyle={buttonRowStyles.button}
          // textStyle={buttonRowStyles.buttonText}
          onPress={props.normalStep}
          size="jumbo"
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          title=">>>"
          // buttonStyle={buttonRowStyles.button}
          // textStyle={buttonRowStyles.buttonText}
          onPress={props.bigStep}
          size="jumbo"
        />
      </View>
    </View>
  );
}
