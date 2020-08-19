import React, {useState} from 'react';
import {Text, ScrollView, View, StyleSheet, Platform} from 'react-native';
import {Verse, isDivided, DividedVerse} from '../verses/Verse';
import Container from '../components/Container';
import {useT} from '../i18n/i18nReact';
import {useDispatch} from 'react-redux';
import versesSlice, {versesUpdateAction} from './versesSlice';
import produce from 'immer';
import {useAppSelector} from '../BHState';
import HelpText from './HelpText';
import BHCheckbox from '../components/BHCheckbox';
import BHTouchable from '../components/BHTouchable';
import {settingsSlice} from '../settings/Settings';
import BHButton from '../components/BHButton';

const isIOS = Platform.OS == 'ios';

interface IProps {
  verse: Verse;
  done: () => void;
}

type Splits = {word: string; index: number}[][];

export default function PassageSplitter(props: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const verse = props.verse;
  const [splits, setSplits] = useState(generateSplits(verse));
  const [currentSplit, setCurrentSplit] = useState(
    verse.learned ? splits.length : isDivided(verse) ? verse.currentSplit : 0,
  );

  const {passageSplitterHelpTextSeen} = useAppSelector(
    (state) => state.settings,
  );
  const [showHelpText, setShowHelpText] = useState(
    !passageSplitterHelpTextSeen,
  );

  const save = () => {
    const newVerse: DividedVerse = {
      ...verse,
      learned: currentSplit >= splits.length,
      splitIndices: getSplitIndices(splits),
      currentSplit: currentSplit,
    };
    dispatch(versesUpdateAction(versesSlice.actions.update(newVerse)));
    props.done();
  };

  const toggleSplitLearned = (splitNumber: number, learned: boolean) => {
    setCurrentSplit(learned ? splitNumber + 1 : splitNumber);
  };

  const wordPress = (splitIndex: number, wordIndex: number) => {
    if (wordIndex == 0 && splitIndex > 0) {
      const newSplits = produce(splits, (newSplits) => {
        newSplits[splitIndex - 1] = newSplits[splitIndex - 1].concat(
          newSplits[splitIndex],
        );
        newSplits.splice(splitIndex, 1);
      });
      setSplits(newSplits);
    }
    if (wordIndex > 0) {
      const newSplits = produce(splits, (newSplits) => {
        newSplits.splice(
          splitIndex + 1,
          0,
          newSplits[splitIndex].slice(wordIndex),
        );
        newSplits[splitIndex] = newSplits[splitIndex].slice(0, wordIndex);
      });
      setSplits(newSplits);
    }
  };

  const dismissHelpText = () => {
    setShowHelpText(false);
    dispatch(settingsSlice.actions.setPassageSplitterHelpTextSeen(true));
  };

  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, paddingBottom: 80}}>
          {splits.map((split, splitNumber) => (
            <View key={splitNumber.toString()} style={styles.split}>
              <View style={styles.splitHeader}>
                <Text style={styles.splitHeaderTitle}>
                  {t('Part') + ' ' + (splitNumber + 1)}
                </Text>
                <BHCheckbox
                  small={true}
                  label={t('Learned')}
                  value={currentSplit > splitNumber}
                  onValueChange={(checked) => {
                    toggleSplitLearned(splitNumber, checked);
                  }}
                />
              </View>
              <View style={styles.wordContainer}>
                {split.map((wordWithIndex, wordNumber) => (
                  <View
                    style={styles.word}
                    key={wordWithIndex.index.toString()}>
                    <BHTouchable
                      backgroundColor={'#000000'}
                      lighten
                      onPress={() => {
                        wordPress(splitNumber, wordNumber);
                      }}>
                      {(color) => (
                        <View>
                          <Text style={{color}}>{wordWithIndex.word}</Text>
                        </View>
                      )}
                    </BHTouchable>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {showHelpText ? (
        <HelpText
          text={t('PassageSplitterHelp')}
          header={t('PassageSplitter')}
          onDismiss={dismissHelpText}
        />
      ) : (
        <View style={styles.buttonRow}>
          <BHButton title={t('Save')} onPress={save} />
        </View>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  split: {
    paddingVertical: 8,
    paddingHorizontal: isIOS ? 0 : 8,
  },
  splitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitHeaderTitle: {
    fontWeight: 'bold',
  },
  wordContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  word: {
    backgroundColor: 'white',
    padding: 4,
    margin: 4,
    fontSize: 12,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

function generateSplits(verse: Verse): Splits {
  const splitIndices = isDivided(verse) ? verse.splitIndices : [0];
  return splitIndices.map((index, split) => {
    let splitText =
      split == splitIndices.length - 1
        ? verse.text.slice(index)
        : verse.text.slice(index, splitIndices[split + 1]);
    return wordsWithIndices(splitText, index);
  });
}

function wordsWithIndices(text: string, offset: number) {
  const pattern = /\S+/g;
  let wordsIndices = [];
  let find;
  while ((find = pattern.exec(text)) != null) {
    wordsIndices.push({
      word: find[0],
      index: find.index + offset,
    });
  }
  return wordsIndices;
}

function getSplitIndices(splits: Splits) {
  return splits.map((wordsIndices) => wordsIndices[0].index);
}
