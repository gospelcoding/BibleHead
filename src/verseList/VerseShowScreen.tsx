import React, {useState, useEffect} from 'react';
import {
  NavigationProp,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';

import {View, StyleSheet} from 'react-native';
import {Verse, refText} from '../verses/Verse';
import BHText from '../components/BHText';
import BHButton from '../components/BHButton';
import {VersesStackNav} from './VersesStack';
import {useDispatch} from 'react-redux';
import {useT} from '../i18n/i18nReact';
import BHCheckbox from '../components/BHCheckbox';
import VerseEditor from '../addVerse/VerseEditor';
import ScreenRoot from '../components/ScreenRoot';
import {useAppSelector} from '../BHState';
import {ScrollView} from 'react-native-gesture-handler';
import {BHRootTabs} from '../BHRootNav';
import Container from '../components/Container';
import Row from '../components/Row';
import Icon from 'react-native-ionicons';
import ThemeColors from '../util/ThemeColors';
import formattedDate from '../util/formattedDate';
import {LearningStackNav} from '../learning/LearningStack';
import {useVerseById} from '../learning/useVerseById';
import versesSlice, {versesUpdateAction} from './versesSlice';
import splitIcon from './splitIcon';
import useSetVerseRefTitle from './useSetVerseRefTitle';

interface IProps {
  navigation: CompositeNavigationProp<
    CompositeNavigationProp<
      NavigationProp<VersesStackNav, 'VerseShow'>,
      NavigationProp<BHRootTabs>
    >,
    NavigationProp<LearningStackNav>
  >;
  route: RouteProp<VersesStackNav, 'VerseShow'>;
}

export default function VerseShowScreen({navigation, route}: IProps) {
  const dispatch = useDispatch();
  const t = useT();

  const verse = useVerseById(route.params.id);

  const [editing, setEditing] = useState(false);

  useSetVerseRefTitle(navigation, verse);

  if (!verse) return null;

  const removeTheVerse = () => {
    navigation.navigate('VerseList');
    dispatch(versesUpdateAction(versesSlice.actions.remove(verse.id)));
  };

  return (
    <ScreenRoot>
      {editing ? (
        <VerseEditor
          done={() => setEditing(false)}
          saveVerse={(verse) =>
            dispatch(versesUpdateAction(versesSlice.actions.update(verse)))
          }
          verse={verse}
        />
      ) : (
        <Container>
          <ScrollView>
            <ReviewInfo
              verse={verse}
              practice={() =>
                navigation.navigate('DoLearn', {
                  review: {toReview: [], toLearn: [verse.id]},
                })
              }
            />
            <BHText>{verse.text}</BHText>
          </ScrollView>
          <Row>
            <BHCheckbox
              label={t('Learned')}
              value={verse.learned}
              onValueChange={() =>
                dispatch(
                  versesUpdateAction(
                    versesSlice.actions.toggleLearned(verse.id),
                  ),
                )
              }
            />
            <View style={{flex: 1}} />
            <BHButton icon="create" onPress={() => setEditing(true)} />
            <BHButton
              svg={splitIcon}
              onPress={() =>
                navigation.navigate('PassageSplitter', {id: verse.id})
              }
            />
            <BHButton icon="trash" onPress={removeTheVerse} color="red" />
          </Row>
        </Container>
      )}
    </ScreenRoot>
  );
}

function ReviewInfo({verse, practice}: {verse: Verse; practice: () => void}) {
  const t = useT();

  const [dateText, setDateText] = useState('--');

  useEffect(() => {
    const timestamp = verse.learned ? verse.lastReview : verse.lastPracticed;
    if (timestamp)
      formattedDate(new Date(timestamp)).then((dateStr) =>
        setDateText(dateStr),
      );
  });

  return (
    <Row>
      {verse.learned && (
        <View style={styles.iconTextContainer}>
          <Icon name="checkmark" color={ThemeColors.darkGrey} />
          <BHText subdued>{verse.successfulReviews || 0}</BHText>
        </View>
      )}
      <View style={styles.iconTextContainer}>
        <Icon name="calendar" color={ThemeColors.darkGrey} />
        <BHText subdued>{dateText}</BHText>
      </View>
      <View style={{flex: 1}} />
      <BHButton title={t('Practice')} onPress={practice} />
    </Row>
  );
}

const styles = StyleSheet.create({
  iconTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
});
