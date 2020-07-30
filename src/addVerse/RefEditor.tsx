import React, {useState} from 'react';
import {Verse, newVerse} from '../verses/Verse';
import BHText from '../components/BHText';
import {useBibleBooks, useT} from '../i18n/i18nReact';
import PickerList from '../components/PickerList';
import TapText from '../components/TapText';
import NumberInput from '../components/NumberInput';
import BHButton from '../components/BHButton';
import Container from '../components/Container';
import Row from '../components/Row';

interface IProps {
  verse: Verse | undefined;
  setVerse: (v: Verse) => void;
  done: () => void;
}

export default function RefEditor(props: IProps) {
  const t = useT();
  const [showBookList, setShowBookList] = useState(false);
  const bibleBooks = useBibleBooks();

  const setBook = (bookId: number) => {
    const bookParams = {bookId, bookName: bibleBooks[bookId]};
    props.setVerse(
      props.verse
        ? {...props.verse, ...bookParams}
        : newVerse({...bookParams, startChapter: 1, startVerse: 1, text: ''}),
    );
  };

  const updateVerse = props.verse
    ? (update: Partial<Verse>) => {
        if (!props.verse?.startChapter && !update.startChapter)
          update.startChapter = 1; // Need startChapter
        if (!props.verse?.startVerse && !update.startVerse)
          update.startVerse = 1; // Need startVerse
        if (!props.verse?.endChapter && update.endVerse)
          update.endChapter = props.verse?.startChapter || 1; // Need endChapter if endVerse is set

        props.setVerse({...props.verse!, ...update});
      }
    : () => {};

  return (
    <Container>
      {showBookList || !props.verse ? (
        <PickerList
          itemPress={(id) => {
            setBook(id);
            setShowBookList(false);
          }}
          data={bibleBooks.map((_, index) => index)}
          itemText={(id) => bibleBooks[id]}
          keyExtractor={(id) => `${id}`}
        />
      ) : (
        <Container>
          <BHText>{t('Book')}</BHText>
          <TapText
            text={props.verse.bookName}
            onPress={() => setShowBookList(true)}
          />
          <BHText>{t('StartVerse')}</BHText>
          <Row>
            <NumberInput
              value={props.verse.startChapter}
              setValue={(startChapter) => updateVerse({startChapter})}
            />
            <BHText>:</BHText>
            <NumberInput
              value={props.verse.startVerse || 1}
              setValue={(startVerse) => updateVerse({startVerse})}
            />
          </Row>

          <BHText>{t('EndVerse')}</BHText>
          <Row>
            <NumberInput
              value={props.verse.endChapter || props.verse.startChapter}
              setValue={(endChapter) => updateVerse({endChapter})}
            />
            <BHText>:</BHText>
            <NumberInput
              value={props.verse.endVerse || props.verse.startVerse || 1}
              setValue={(endVerse) => updateVerse({endVerse})}
            />
          </Row>

          <BHButton title={t('Done')} onPress={props.done} />
        </Container>
      )}
    </Container>
  );
}
