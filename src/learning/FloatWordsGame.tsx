import produce from 'immer';
import React, {useRef, useState} from 'react';
import {View, Animated, Easing, Text} from 'react-native';
import BHButton from '../components/BHButton';
import {randInt, shuffle} from '../util/util';
import {Verse, versePracticeParams} from '../verses/Verse';
import {getWords} from './gameUtils';
import FWReview from './FWReview';
import ButtonRowFinal from './ButtonRowFinal';

const DEFAULT_ROW_SIZE = 3;
type BColor = 'blue' | 'green' | 'red' | 'gray';

interface IProps {
  verse: Verse;
  didPractice: () => void;
  done: () => void;
}

export interface FWGame {
  rowSize: number;
  rows: string[][];
  bcolors: BColor[][];
  indices: number[];
  correct: boolean[];
  errors: number;
}

class FWAnimator {
  startMargin = 0;
  endMargin = 0;
  margRef: React.MutableRefObject<Animated.Value>;
  done: () => void;

  constructor(
    margRef: React.MutableRefObject<Animated.Value>,
    done: () => void,
  ) {
    this.margRef = margRef;
    this.done = done;
  }

  setStartMargin(margin: number) {
    if (this.startMargin != 0) return;
    this.startMargin = margin;
    this.startAnimation();
  }

  setEndMargin(margin: number) {
    if (this.endMargin != 0) return;
    this.endMargin = margin;
    this.startAnimation();
  }

  startAnimation() {
    if (this.startMargin != 0 && this.endMargin != 0) {
      this.margRef.current.setValue(this.startMargin);
      Animated.timing(this.margRef.current, {
        useNativeDriver: false,
        toValue: this.endMargin,
        duration: (this.startMargin - this.endMargin) * 10,
        easing: Easing.linear,
      }).start(() => this.done());
    }
  }
}

export default function FloatWordsGame(props: IProps) {
  const [practiceParams] = useState(versePracticeParams(props.verse));
  const [game, setGame] = useState(makeGame(practiceParams.text));
  const [done, setDone] = useState(false);
  const endGame = () => {
    setDone(true);
    props.didPractice();
  };
  const margRef = useRef(new Animated.Value(0));
  const animatorRef = useRef(new FWAnimator(margRef, () => endGame()));
  // const speed = 2;
  const spacing = 40; // Could vary to adjust difficulty

  return done ? (
    <View style={{flexGrow: 1}}>
      <FWReview verseText={practiceParams.text} game={game} />
      <ButtonRowFinal
        verse={props.verse}
        done={props.done}
        replay={() => {
          setGame(makeGame(practiceParams.text));
          setDone(false);
          animatorRef.current.startAnimation();
        }}
      />
    </View>
  ) : (
    <Animated.View
      style={{
        flex: 1,
        marginTop: margRef.current,
        zIndex: -4,
      }}
      onLayout={(e: any) => {
        animatorRef.current.setStartMargin(e.nativeEvent.layout.height);
      }}>
      <Text style={{fontSize: 18}}>{practiceParams.prompt}</Text>
      {game.rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: 'row',
            marginBottom: spacing,
            justifyContent: 'space-around',
          }}>
          {row.map((word, wordIndex) => {
            const bcolor = game.bcolors[rowIndex][wordIndex];
            return (
              <BHButton
                key={word}
                size="big"
                color={
                  bcolor == 'red'
                    ? 'red'
                    : bcolor == 'green'
                    ? 'green'
                    : undefined
                }
                disabled={bcolor == 'gray'}
                onPress={
                  bcolor == 'blue'
                    ? () =>
                        buttonPush(rowIndex, wordIndex, game, setGame, () =>
                          endGame(),
                        )
                    : () => {}
                }
                title={word}
              />
            );
          })}
        </View>
      ))}
      <View
        style={{height: 0}}
        onLayout={(e) => {
          animatorRef.current.setEndMargin(e.nativeEvent.layout.y * -1);
        }}
      />
    </Animated.View>
  );
}

function buttonPush(
  rowIndex: number,
  wordIndex: number,
  game: FWGame,
  setGame: (g: FWGame) => void,
  endGame: () => void,
) {
  if (game.indices[rowIndex] == wordIndex) {
    const newGame = produce(game, (newGame) => {
      newGame.bcolors[rowIndex] = new Array(game.rowSize).fill('gray');
      newGame.bcolors[rowIndex][wordIndex] = 'green';
      newGame.correct[rowIndex] = true;
    });
    setGame(newGame);
    if (rowIndex == game.rows.length - 1) endGame();
  } else {
    const newGame = produce(game, (newGame) => {
      newGame.bcolors[rowIndex][wordIndex] = 'red';
      newGame.errors += 1;
    });
    setGame(newGame);
  }
}

function makeGame(text: string): FWGame {
  const words = getWords(text).map((indexedWord) => indexedWord.word);
  const game: FWGame = {
    rowSize: safeRowSize(words),
    rows: [],
    indices: [],
    errors: 0,
    bcolors: [],
    correct: new Array(words.length).fill(false),
  };
  words.forEach((_w, index) => {
    const [row, correct] = gameRow(words, index, game.rowSize);
    game.rows.push(row);
    game.indices.push(correct);
    game.bcolors.push(new Array(game.rowSize).fill('blue'));
  });
  return game;
}

function gameRow(
  words: string[],
  index: number,
  rowSize: number,
): [string[], number] {
  const row = [words[index]];
  for (let i = 0; i < rowSize - 1; ++i) {
    row.push(findDistractor(words, row));
  }
  shuffle(row);
  const correct = row.findIndex((w) => w == words[index]);
  return [row, correct];
}

function findDistractor(words: string[], except: string[]) {
  while (true) {
    const word = words[randInt(words.length)];
    if (!except.includes(word)) return word;
  }
}

function safeRowSize(words: string[]) {
  const uniqueWords: string[] = [];
  for (let i = 0; i < words.length; ++i) {
    const word = words[i];
    if (!uniqueWords.includes(word)) uniqueWords.push(word);
    if (uniqueWords.length >= DEFAULT_ROW_SIZE) return DEFAULT_ROW_SIZE;
  }
  return uniqueWords.length;
}
