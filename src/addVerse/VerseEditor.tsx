import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RefEditorModal from './RefEditor';
import {useDispatch} from 'react-redux';
import {Verse, refText} from '../verses/Verse';
import TapText from '../components/TapText';
import BHTextInput from '../util/BHTextInput';
import {useT} from '../i18n/i18nReact';
import BHButton from '../components/BHButton';

interface IProps {
  done: () => void;
  saveVerse: (verse: Verse) => void;
  verse?: Verse;
}

export default function VerseEditor(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const [verse, setVerse] = useState<Verse | undefined>(props.verse);
  const [showRefEditor, setShowRefEditor] = useState(!props.verse);

  return (
    <View style={{flex: 1}}>
      {showRefEditor || !verse ? (
        <RefEditorModal
          verse={verse}
          setVerse={(verse) => setVerse(verse)}
          done={() => setShowRefEditor(false)}
        />
      ) : (
        <View style={{flex: 1}}>
          <TapText
            text={refText(verse)}
            onPress={() => setShowRefEditor(true)}
          />
          <View style={{flexShrink: 1, flexGrow: 1}}>
            <ScrollView>
              <BHTextInput
                multiline
                value={verse.text}
                onChangeText={(text) => setVerse({...verse, text})}
              />
            </ScrollView>
          </View>
          <View style={{flexDirection: 'row'}}>
            <BHButton
              title={t('Save')}
              onPress={() => {
                props.saveVerse(verse);
                props.done();
              }}
            />
            <BHButton title={t('Cancel')} onPress={props.done} />
          </View>
        </View>
      )}
    </View>
  );
}
