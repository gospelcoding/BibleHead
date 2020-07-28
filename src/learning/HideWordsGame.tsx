import React, {useState} from 'react';
import {Text, View, Platform, StyleSheet, ScrollView} from 'react-native';
import {Verse, PracticeParams, versePracticeParams} from '../verses/Verse';
import {shuffle} from '../util/util';
import ButtonRowFinal from './ButtonRowFinal';
import ButtonRowHideWords from './ButtonRowHideWords';
import BHText from '../components/BHText';
import ThemeColors from '../util/ThemeColors';

const isIOS = Platform.OS == 'ios';

interface IProps {
  verse: Verse;
}

export default function HideWordsGame(props: IProps) {
  const practiceParams = versePracticeParams(props.verse);
  const [verseText] = useState(nonBreakingHyphenize(practiceParams.text));
  const [gameText, setGameText] = useState(verseText);
  const [coordinates, setCoordinates] = useState(getWordCoordinates(verseText));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [peek, setPeek] = useState(false);

  const takeStep = (numberOfSteps: number) => {
    if (step >= coordinates.length) {
      setDone(true);
      setGameText(verseText);
    } else {
      const nextStepVals = calculateStep(
        gameText,
        coordinates,
        step,
        numberOfSteps,
      );
      setGameText(nextStepVals.gameText);
      setStep(nextStepVals.step);
    }
  };

  const normalStep = () => {
    takeStep(4);
  };

  const bigStep = () => {
    takeStep(12);
  };

  const replay = () => {
    setGameText(verseText);
    setCoordinates(getWordCoordinates(verseText));
    setStep(0);
    setDone(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {!!practiceParams.prompt && (
          <Text style={styles.promptText}>{practiceParams.prompt}</Text>
        )}
        <Text style={styles.hideWordsText} textBreakStrategy="simple">
          {peek ? verseText : gameText}
        </Text>
      </ScrollView>
      {done ? (
        <ButtonRowFinal replay={replay} verse={props.verse} />
      ) : (
        <ButtonRowHideWords
          step={step}
          setPeek={() => setPeek(true)}
          cancelPeek={() => setPeek(false)}
          normalStep={normalStep}
          bigStep={bigStep}
        />
      )}
    </View>
  );
}

function nonBreakingHyphenize(text: string) {
  const pattern = /(\S)-(\S)/g;
  const nonBreakingHyphen = '‑';
  return text.replace(pattern, '$1' + nonBreakingHyphen + '$2');
}

// Coordinates for words of text. First element of pair is index
// of start of word. Second element is word length
type Coordinates = [number, number][];

function getWordCoordinates(text: string): Coordinates {
  const pattern = /([^.,:;?¿!¡"“”‘’«»()\s])+/g;
  let coordinates = [] as Coordinates;
  let find;
  while ((find = pattern.exec(text)) !== null) {
    coordinates.push([find.index, find[0].length]);
  }
  shuffle(coordinates);
  return coordinates;
}

function calculateStep(
  gameText: string,
  coordinates: Coordinates,
  step: number,
  numberToStep: number,
) {
  const stepTo = Math.min(step + numberToStep, coordinates.length);
  for (let s = step; s < stepTo; ++s) {
    let index = coordinates[s][0];
    let wordLength = coordinates[s][1];
    let dashes = new Array(wordLength).fill('-', 0, wordLength).join('');
    gameText =
      gameText.slice(0, index) + dashes + gameText.slice(index + wordLength);
  }
  return {
    gameText: gameText,
    step: stepTo,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
  },
  promptText: {
    fontFamily: isIOS ? 'Menlo' : 'monospace',
    fontSize: 24,
    padding: 8,
    marginHorizontal: isIOS ? 0 : 8,
  },
  hideWordsText: {
    fontFamily: isIOS ? 'Menlo' : 'monospace',
    fontSize: 24,
    padding: 8,
    backgroundColor: ThemeColors.white,
    margin: 0,
    elevation: 0,
  },
});
