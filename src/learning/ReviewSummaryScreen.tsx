import React, {useEffect} from 'react';
import {useAppSelector} from '../BHState';
import {sameDay} from '../util/util';
import {View, StyleSheet} from 'react-native';
import BHButton from '../components/BHButton';
import {useT, useMonthNames} from '../i18n/i18nReact';
import BHText from '../components/BHText';
import {selectReviewVersesAndLearningVerse, Verse} from '../verses/Verse';
import ScreenRoot from '../components/ScreenRoot';
import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {BHRootTabs} from '../BHRootNav';
import {LearningStackNav} from './LearningStack';
import {streakLength} from '../util/Streak';
import {useDispatch} from 'react-redux';
import versesSlice from '../verseList/versesSlice';
import {ScrollView} from 'react-native-gesture-handler';
import {learnedSummary} from '../util/DateList';
import Row from '../components/Row';
import ThemeColors from '../util/ThemeColors';
import DividingLine from '../components/DividingLine';
import {Text} from 'react-native';
import HighlightText from '../components/HighlightText';
import {useFormattedDate} from '../util/formattedDate';
import useAutoReview from './useAutoReview';
import CommonStyles from '../util/CommonStyles';

interface IProps {
  navigation: CompositeNavigationProp<
    NavigationProp<BHRootTabs, 'Learning'>,
    NavigationProp<LearningStackNav>
  >;
}

export default function ReviewSummaryScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();
  const monthNames = useMonthNames();

  const {bestStreak, currentStreak, verses} = useAppSelector(
    (state) => state.verses,
  );
  const today = new Date();
  const reviewedToday = verses.filter(
    (v) =>
      sameDay(today, new Date(v.lastReview || 0)) ||
      sameDay(today, new Date(v.lastPracticed || 0)),
  );

  const bestStreakCount = streakLength(bestStreak);
  const currentStreakCount = streakLength(currentStreak);
  const currentStreakStart = useFormattedDate(
    currentStreak && currentStreak[0],
  );
  const bestStreakStart = useFormattedDate(bestStreak && bestStreak[0]);
  const bestStreakEnd = useFormattedDate(bestStreak && bestStreak[1]);

  const learnedStats = learnedSummary(verses, monthNames);

  useEffect(() => {
    dispatch(versesSlice.actions.streakReset());
  });

  useAutoReview(verses, navigation);

  if (verses.length == 0) {
    return (
      <View>
        <BHText>{t('NoVerses')}</BHText>
        <BHButton
          title={t('AddVerse')}
          onPress={() => navigation.navigate('AddVerse')}
        />
      </View>
    );
  }

  return (
    <ScreenRoot>
      <ScrollView>
        <HighlightText
          text={t(
            'VersesReviewedToday',
            {number: reviewedToday.length},
            reviewedToday.length,
          )}
          pattern={reviewedToday.length}
          style={[styles.base, styles.med, styles.center]}
          highlightStyle={[styles.big, styles.blue, styles.shadow]}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <BHButton
            title={t('ReviewVerses')}
            onPress={() =>
              navigation.navigate('DoLearn', {
                review: selectReviewVersesAndLearningVerse(verses),
              })
            }
          />
        </View>

        <DividingLine />

        <View style={styles.row}>
          <Text style={[styles.base, styles.med]}>{t('CurrentStreak')}:</Text>

          <HighlightText
            text={t('days', {number: currentStreakCount}, currentStreakCount)}
            pattern={currentStreakCount}
            style={[styles.base, styles.med]}
            highlightStyle={[styles.blue, styles.big, styles.shadow]}
          />
        </View>
        <Text style={[styles.base, {fontWeight: '100'}]}>
          {currentStreakCount >= 5 && (
            <Text>
              {t('YouveWorkedEveryDay', {date: currentStreakStart})}
              {'\n'}
            </Text>
          )}
          {bestStreak &&
            (bestStreakCount == currentStreakCount
              ? bestStreakCount >= 5
                ? t('ThisYourBestStreak')
                : ''
              : t(
                  'YourBestStreak',
                  {
                    number: bestStreakCount,
                    dateStart: bestStreakStart,
                    dateEnd: bestStreakEnd,
                  },
                  bestStreakCount,
                ))}
        </Text>

        <DividingLine />

        <HighlightText
          text={t(
            'YouveLearnedVerses',
            {number: learnedStats.total},
            learnedStats.total,
          )}
          pattern={learnedStats.total}
          style={[styles.base, styles.center]}
          highlightStyle={[styles.big, styles.blue, styles.shadow]}
        />
        <View style={{width: '75%', maxWidth: 280, alignSelf: 'center'}}>
          <Text style={styles.base}>
            <Text
              style={[
                styles.big,
                styles.blue,
                styles.shadow,
              ]}>{`${learnedStats.thisWeek} `}</Text>
            <Text style={styles.med}>{t('thisWeek')}</Text>
            <Arrow
              current={learnedStats.thisWeek}
              old={learnedStats.lastWeek}
            />
          </Text>
          <Text style={[styles.base, styles.grey, styles.right]}>
            <Text>{t('LastWeek')} :</Text>
            <Text style={[styles.med]}>{` ${learnedStats.lastWeek}`}</Text>
          </Text>

          <Text style={styles.base}>
            <Text
              style={[
                styles.big,
                styles.blue,
                styles.shadow,
              ]}>{`${learnedStats.thisMonth} `}</Text>
            <Text style={styles.med}>
              {t('in', {container: learnedStats.names.thisMonth})}
            </Text>
            <Arrow
              current={learnedStats.thisMonth}
              old={learnedStats.lastMonth}
            />
          </Text>
          <Text style={[styles.base, styles.grey, styles.right]}>
            <Text>{learnedStats.names.lastMonth} :</Text>
            <Text style={[styles.med]}>{` ${learnedStats.lastMonth}`}</Text>
          </Text>

          <Text style={styles.base}>
            <Text
              style={[
                styles.big,
                styles.blue,
                styles.shadow,
              ]}>{`${learnedStats.thisYear} `}</Text>
            <Text style={styles.med}>
              {t('in', {container: learnedStats.names.thisYear})}
            </Text>
            <Arrow
              current={learnedStats.thisYear}
              old={learnedStats.lastYear}
            />
          </Text>
          <Text style={[styles.base, styles.grey, styles.right]}>
            <Text>{learnedStats.names.lastYear} :</Text>
            <Text style={[styles.med]}>{` ${learnedStats.lastYear}`}</Text>
          </Text>
        </View>
      </ScrollView>
    </ScreenRoot>
  );
}

function Arrow(props: {current: number; old: number}) {
  const {current, old} = props;
  const arrow = current > old ? '➚' : current < old ? '➘' : '➙';
  const colorStyle = current < old ? styles.red : styles.green;
  return <Text style={[styles.big, styles.shadow, colorStyle]}> {arrow}</Text>;
}

const styles = StyleSheet.create({
  base: {
    fontSize: 18,
    margin: 8,
    textAlign: 'left',
  },
  med: {
    fontSize: 24,
  },
  big: {
    fontSize: 36,
  },
  blue: {
    color: ThemeColors.lightBlue,
  },
  red: {
    color: ThemeColors.red,
  },
  green: {
    color: ThemeColors.green,
  },
  grey: {
    color: ThemeColors.darkGrey,
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  shadow: CommonStyles.shadow,
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});
