import React, {useState} from 'react';
import {useAppSelector} from '../BHState';
import {useBibleBooks, useT} from '../i18n/i18nReact';
import CommonStyles from '../util/CommonStyles';
import {Pressable, Text, View, Button} from 'react-native';
import PickerModal from '../components/PickerModal';
import NumberInput from '../components/NumberInput';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import draftVerseSlice from './draftVerseSlice';
import {newVerse} from '../verses/Verse';

interface IProps {
  navigation: NavigationProp<any, any>;
}

export default function RefEditorScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const t = useT();
  const draftVerse = useAppSelector((state) => state.draftVerse);
  const bibleBooks = useBibleBooks();
  const [bookId, setBookId] = useState(draftVerse?.bookId || 0);
  const bookName = bibleBooks[bookId];
  const [startChapter, setStartChapter] = useState(
    draftVerse?.startChapter || 1,
  );
  const [endChapter, setEndChapter] = useState(draftVerse?.endChapter || 1);
  const [startVerse, setStartVerse] = useState(draftVerse?.startVerse || 1);
  const [endVerse, setEndVerse] = useState(draftVerse?.endVerse || 1);

  const [showBookModal, setShowBookModal] = useState(draftVerse === undefined);

  return (
    <View style={CommonStyles.screenRoot}>
      <Pressable onPress={() => setShowBookModal(true)}>
        <Text style={CommonStyles.textView}>{bookName}</Text>
      </Pressable>
      <PickerModal
        isVisible={showBookModal}
        dismissModal={() => setShowBookModal(false)}
        itemSelected={(id) => setBookId(id)}
        data={bibleBooks.map((_, index) => index)}
        itemText={(id) => bibleBooks[id]}
      />
      <Text style={CommonStyles.listHeader}>{t('Start')}:</Text>
      <View style={{flexDirection: 'row'}}>
        <NumberInput value={startChapter} setValue={setStartChapter} />
        <Text style={CommonStyles.textView}>:</Text>
        <NumberInput value={startVerse} setValue={setStartVerse} />
      </View>

      <Text style={CommonStyles.listHeader}>{t('End')}</Text>
      <View style={{flexDirection: 'row'}}>
        <NumberInput value={endChapter} setValue={setEndChapter} />
        <Text style={CommonStyles.textView}>:</Text>
        <NumberInput value={endVerse} setValue={setEndVerse} />
      </View>
      <Button
        title={t('Save')}
        onPress={() => {
          dispatch(
            draftVerseSlice.actions.setDraftVerse(
              newVerse({
                bookId,
                bookName,
                startChapter,
                startVerse,
                endChapter,
                endVerse,
                text: draftVerse?.text || '',
              }),
            ),
          );
          navigation.navigate('TextEntry');
        }}
      />
    </View>
  );
}
