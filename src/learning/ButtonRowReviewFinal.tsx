import React from 'react';
import {View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {buttonRowStyles} from '../util/CommonStyles';
import BHIconButton from '../components/BHIconButton';
import ThemeColors from '../util/ThemeColors';
import {Verse} from '../verses/Verse';
import {verseReviewDone} from '../verseList/versesSlice';

const isIOS = Platform.OS == 'ios';

interface IProps {
  verse: Verse;
}

export default function ButtonRowReviewFinal(props: IProps) {
  const dispatch = useDispatch();

  return (
    <View style={buttonRowStyles.buttonRow}>
      <View style={buttonRowStyles.buttonContainer}>
        <BHIconButton
          name="close"
          size={isIOS ? 60 : 36}
          color={ThemeColors.red}
          buttonStyle={buttonRowStyles.button}
          textStyle={buttonRowStyles.buttonText}
          onPress={() => dispatch(verseReviewDone(false))}
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHIconButton
          name="checkmark"
          size={isIOS ? 70 : 36}
          color={ThemeColors.buttonGreen}
          buttonStyle={buttonRowStyles.button}
          textStyle={buttonRowStyles.buttonText}
          onPress={() => dispatch(verseReviewDone(true))}
        />
      </View>
    </View>
  );
}
