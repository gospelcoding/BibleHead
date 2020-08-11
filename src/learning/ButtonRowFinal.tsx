import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useT} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import {Verse} from '../verses/Verse';
import versesSlice, {toggleVerseLearned} from '../verseList/versesSlice';
import {buttonRowStyles} from '../util/CommonStyles';
import BHCheckbox from '../components/BHCheckbox';
import BHButton from '../components/BHButton';

interface IProps {
  replay: () => void;
  verse: Verse;
  done: () => void;
}

export default function ButtonRowFinal(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  return (
    <View>
      <View style={{flexDirection: 'row-reverse'}}>
        <BHCheckbox
          label={t('Learned')}
          value={!!props.verse.learned}
          onValueChange={() => dispatch(toggleVerseLearned(props.verse.id))}
        />
      </View>
      <View style={buttonRowStyles.buttonRow}>
        <View style={buttonRowStyles.buttonContainer}>
          <BHButton
            icon="refresh"
            // size={36}
            onPress={props.replay}
            // buttonStyle={buttonRowStyles.button}
            // textStyle={buttonRowStyles.iconButtonText}
            size="jumbo"
          />
        </View>
        <View style={buttonRowStyles.buttonContainer}>
          <BHButton
            icon="home"
            // size={36}
            onPress={props.done}
            // buttnStyle={buttonRowStyles.button}
            // textStoyle={buttonRowStyles.iconButtonText}
            size="jumbo"
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
