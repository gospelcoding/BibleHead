import React, {useState} from 'react';
import {Text, Platform, View, ScrollView, StyleSheet} from 'react-native';
import ButtonWords from './ButtonWords';
import {Verse, versePracticeParams} from '../verses/Verse';
import {randInt} from '../util/util';
import BHText from '../components/BHText';
import ButtonRowFinal from './ButtonRowFinal';

const isIOS = Platform.OS == 'ios';
const numberOfButtons = 12;

interface IProps {
  verse: Verse;
}

export default function ShuffleWordsGame(props: IProps) {
  const [practiceParams] = useState(versePracticeParams(props.verse));
  const [game, setGame] = useState(makeShuffleWordsGame(practiceParams.text));

  const replay = () => {
    setGame(makeShuffleWordsGame(practiceParams.text));
  };

  const addWrong = (buttonWordIndex: number) => {
    const redButtons = [...game.redButtons, buttonWordIndex];
    const greenWord =
      redButtons.length >= 3 ? game.wordsWithIndices[game.step].word : '';
    setGame({...game, redButtons, greenWord});
  };

  const advance = (buttonWordIndex: number) => {
    const step = game.step + 1;
    if (step == game.wordsWithIndices.length) {
      setGame({...game, done: true, gameText: practiceParams.text});
    } else {
      const gameText = practiceParams.text.slice(
        0,
        game.wordsWithIndices[step].index,
      );
      const nextGame = {...game, step, gameText, redButtons: [], greenWord: ''};
      if (game.shuffledWords.length >= step + numberOfButtons) {
        const newButtonWord = game.shuffledWords[step + numberOfButtons - 1];
        nextGame.buttonWords = nextGame.buttonWords.map((bw, index) =>
          index == buttonWordIndex ? newButtonWord : bw,
        );
      } else {
        nextGame.hidButtons = [...game.hidButtons, buttonWordIndex];
      }
      setGame(nextGame);
    }
  };

  const buttonWordPress = (word: string, buttonWordIndex: number) => {
    if (word === game.wordsWithIndices[game.step].word)
      advance(buttonWordIndex);
    else addWrong(buttonWordIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {!!practiceParams.prompt && (
          <Text style={styles.promptText}>{practiceParams.prompt}</Text>
        )}
        <BHText>{game.gameText}</BHText>
      </ScrollView>
      {game.done ? (
        <ButtonRowFinal replay={replay} verse={props.verse} />
      ) : (
        <ButtonWords
          buttonWords={game.buttonWords}
          buttonWordPress={buttonWordPress}
          redButtons={game.redButtons}
          greenWord={game.greenWord}
          hidButtons={game.hidButtons}
        />
      )}
    </View>
  );
}

type ShuffleWordsGame = {
  wordsWithIndices: IndexedWord[];
  shuffledWords: string[];
  buttonWords: string[];
  gameText: string;
  redButtons: number[];
  hidButtons: number[];
  greenWord: string;
  step: number;
  done: boolean;
};

function makeShuffleWordsGame(text: string): ShuffleWordsGame {
  const wordsWithIndices = getWords(text);
  const shuffledWords = shuffle(wordsWithIndices);
  const buttonWords = shuffledWords.slice(0, numberOfButtons);
  return {
    wordsWithIndices: wordsWithIndices,
    shuffledWords: shuffledWords,
    buttonWords: buttonWords,
    gameText: '',
    redButtons: [],
    hidButtons: [],
    greenWord: '',
    step: 0,
    done: false,
  };
}

type IndexedWord = {
  word: string;
  index: number;
};

function getWords(text: string): IndexedWord[] {
  const pattern = /\S+/g;
  const wordsWithIndices: IndexedWord[] = [];
  let find;
  while ((find = pattern.exec(text)) !== null) {
    wordsWithIndices.push({
      word: find[0],
      index: find.index,
    });
  }

  const startPunctuation = /^[.,:;?¿!¡"“”‘’«»()]+/;
  const endPunctuation = /[.,:;?¿!¡"“”‘’«»()]+$/;
  for (let wordObj of wordsWithIndices) {
    wordObj.word = wordObj.word
      .replace(startPunctuation, '')
      .replace(endPunctuation, '')
      .toUpperCase();
  }

  return wordsWithIndices;
}

function shuffle(wordsWithIndices: IndexedWord[]) {
  let shuffledWords = wordsWithIndices.map((wordObj) => wordObj.word);
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    let swapIndex = i - randInt(Math.min(numberOfButtons, i + 1));
    let swapMe = shuffledWords[i];
    shuffledWords[i] = shuffledWords[swapIndex];
    shuffledWords[swapIndex] = swapMe;
  }
  return shuffledWords;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isIOS ? 'white' : undefined,
  },
  promptText: {
    fontSize: 18,
    padding: 8,
    marginHorizontal: isIOS ? 0 : 8,
  },
});
