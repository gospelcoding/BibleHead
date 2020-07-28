import React from 'react';
import {useAppSelector} from '../BHState';
import {sameDay} from '../util/util';
import {View} from 'react-native';
import BHButton from '../components/BHButton';
import {useT} from '../i18n/i18nReact';
import BHText from '../components/BHText';
import {refText} from '../verses/Verse';
import {useDispatch} from 'react-redux';
import versesSlice from '../verseList/versesSlice';

interface IProps {
  addVerse: () => void;
}

export default function ReviewSummary(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const verses = useAppSelector((state) => state.verses.verses);
  const today = new Date();
  const reviewedToday = verses.filter(
    (v) => v.lastReview && sameDay(today, new Date(v.lastReview)),
  );

  if (verses.length == 0) {
    return (
      <View>
        <BHText>{t('NoVerses')}</BHText>
        <BHButton title={t('AddVerse')} onPress={props.addVerse} />
      </View>
    );
  }

  return (
    <View>
      <BHButton
        title={t('ReviewVerses')}
        onPress={() => dispatch(versesSlice.actions.startReview())}
      />
      <BHText>{t('VersesReviewedToday')}</BHText>
      {reviewedToday.map((verse) => (
        <BHText>{refText(verse)}</BHText>
      ))}
    </View>
  );
}
