import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import RefEditor from './RefEditor';
import {useDispatch} from 'react-redux';
import {Verse, refText} from '../verses/Verse';
import TapText from '../components/TapText';
import BHTextInput from '../util/BHTextInput';
import {useT} from '../i18n/i18nReact';
import BHButton from '../components/BHButton';
import Container from '../components/Container';
import {useKeyboard} from '@react-native-community/hooks';

interface IProps {
  done: (save: boolean) => void;
  saveVerse: (verse: Verse) => void;
  verse?: Verse;
}

export default function VerseEditor(props: IProps) {
  const t = useT();

  const [verse, setVerse] = useState<Verse | undefined>(props.verse);
  const [showRefEditor, setShowRefEditor] = useState(!props.verse);
  const keyboard = useKeyboard();
  const tabHeight = 49;
  const keyboardPad =
    keyboard.keyboardShown && Platform.OS == 'ios'
      ? keyboard.keyboardHeight - tabHeight
      : 0;

  return (
    <Container>
      {showRefEditor || !verse ? (
        <RefEditor
          verse={verse}
          setVerse={(verse) => setVerse(verse)}
          done={() => setShowRefEditor(false)}
        />
      ) : (
        <Container>
          {!keyboard.keyboardShown && (
            <TapText
              text={refText(verse)}
              onPress={() => setShowRefEditor(true)}
            />
          )}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <BHTextInput
              multiline
              value={verse.text}
              onChangeText={(text) => setVerse({...verse, text})}
              placeholder={t('VerseTextInputHint')}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: keyboardPad,
            }}>
            <BHButton
              title={t('Save')}
              onPress={() => {
                props.saveVerse(verse);
                props.done(true);
                setVerse(undefined);
              }}
              disabled={verse.text.length == 0}
            />
            <BHButton title={t('Cancel')} onPress={() => props.done(false)} />
          </View>
        </Container>
      )}
    </Container>
  );
}
