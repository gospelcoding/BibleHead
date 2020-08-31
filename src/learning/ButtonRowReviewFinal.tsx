import React from 'react';
import {View, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {buttonRowStyles} from '../util/CommonStyles';
import ThemeColors from '../util/ThemeColors';
import {Verse} from '../verses/Verse';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import versesSlice, {versesUpdateAction} from '../verseList/versesSlice';

const isIOS = Platform.OS == 'ios';

interface IProps {
  verse: Verse;
  done: () => void;
}

export default function ButtonRowReviewFinal(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  return (
    <View style={buttonRowStyles.buttonRow}>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          icon="close"
          // size={isIOS ? 60 : 36}
          color="red"
          // buttonStyle={buttonRowStyles.button}
          // textStyle={buttonRowStyles.buttonText}
          onPress={() => {
            dispatch(
              versesUpdateAction(
                versesSlice.actions.reviewDone({
                  id: props.verse.id,
                  success: false,
                }),
              ),
            );
            props.done();
          }}
          title={t('Wrong')}
          size="jumbo"
          iosFixJumboIcon
        />
      </View>
      <View style={buttonRowStyles.buttonContainer}>
        <BHButton
          icon="checkmark"
          // size={isIOS ? 70 : 36}
          color="green"
          // buttonStyle={buttonRowStyles.button}
          // textStyle={buttonRowStyles.buttonText}
          onPress={() => {
            dispatch(
              versesUpdateAction(
                versesSlice.actions.reviewDone({
                  id: props.verse.id,
                  success: true,
                }),
              ),
            );
            props.done();
          }}
          size="jumbo"
          iosFixJumboIcon
        />
      </View>
    </View>
  );
}
