import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useT} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import {Verse} from '../verses/Verse';
import versesSlice from '../verseList/versesSlice';
import {buttonRowStyles} from '../util/CommonStyles';
import BHCheckbox from '../components/BHCheckbox';
import BHIconButton from '../components/BHIconButton';

interface IProps {
  replay: () => void;
  goHome: () => void;
  verse: Verse;
}

export default function ButtonRowFinal(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  return (
    <View>
      <BHCheckbox
        label={t('Learned')}
        value={!!props.verse.learned}
        onValueChange={() =>
          dispatch(versesSlice.actions.toggleLearned(props.verse.id))
        }
        containerStyle={styles.checkboxContainerStyle}
      />
      <View style={buttonRowStyles.buttonRow}>
        <View style={buttonRowStyles.buttonContainer}>
          <BHIconButton
            name="refresh"
            size={36}
            onPress={props.replay}
            buttonStyle={buttonRowStyles.button}
            textStyle={buttonRowStyles.iconButtonText}
          />
        </View>
        <View style={buttonRowStyles.buttonContainer}>
          <BHIconButton
            name="home"
            size={36}
            onPress={props.goHome}
            buttonStyle={buttonRowStyles.button}
            textStyle={buttonRowStyles.iconButtonText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainerStyle: {
    marginHorizontal: 8,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
});
