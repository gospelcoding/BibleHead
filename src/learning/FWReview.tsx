import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {BaseHighlightText} from '../components/HighlightText';
import ThemeColors from '../util/ThemeColors';
import {FWGame} from './FloatWordsGame';
import {getWords} from './gameUtils';
import CommonStyles from '../util/CommonStyles';
import {count} from '../util/util';

interface IProps {
  verseText: string;
  game: FWGame;
}

export default function FWReview(props: IProps) {
  const chunks = getChunks(props.verseText, props.game);
  const gameScore = score(props.game);

  return (
    <View style={{flexGrow: 1, paddingHorizontal: 8}}>
      <Text
        style={[
          styles.big,
          styles.center,
          styles.shadow,
          styles.vspace,
          gameScore == 100 ? styles.green : styles.blue,
        ]}>
        {gameScore}%
      </Text>
      <ScrollView style={{flex: 1}}>
        <BaseHighlightText
          pieces={chunks}
          style={{fontSize: 24}}
          highlightStyle={{color: ThemeColors.green, fontWeight: 'bold'}}
        />
      </ScrollView>
    </View>
  );
}

function getChunks(verseText: string, game: FWGame) {
  const switchIndices: number[] = [];
  const wordsWithIndices = getWords(verseText);
  game.correct.forEach((correct, wordNum) => {
    if (!correct) {
      const {word, index} = wordsWithIndices[wordNum];
      switchIndices.push(index);
      switchIndices.push(index + word.length);
    }
  });
  const chunks = switchIndices.map((endIndex, i) => {
    const startIndex = i == 0 ? 0 : switchIndices[i - 1];
    return verseText.slice(startIndex, endIndex);
  });
  chunks.push(verseText.slice(switchIndices[switchIndices.length - 1]));
  return chunks;
}

function score(game: FWGame) {
  return Math.floor(
    (100 * Math.max(count(game.correct, true) - game.errors, 0)) /
      game.rows.length,
  );
}

const styles = StyleSheet.create({
  big: {
    fontSize: 36,
  },
  blue: {
    color: ThemeColors.lightBlue,
  },
  green: {
    color: ThemeColors.green,
  },
  center: {
    textAlign: 'center',
  },
  vspace: {
    marginVertical: 40,
  },
  shadow: CommonStyles.shadow,
});
