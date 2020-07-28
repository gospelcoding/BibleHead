import React from 'react';
import {View} from 'react-native';
import BHButton from '../components/BHButton';
import ThemeColors from '../util/ThemeColors';

interface IProps {
  buttonWords: string[];
  greenWord: string;
  redButtons: number[];
  hidButtons: number[];
  buttonWordPress: (word: string, index: number) => void;
}

export default function ButtonWords(props: IProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      {props.buttonWords.map((word, index) => (
        <BHButton
          key={word + index}
          title={word}
          color={buttonColor(word, index, props.greenWord, props.redButtons)}
          hidden={props.hidButtons.includes(index)}
          buttonStyle={{margin: 4}}
          onPress={() => {
            props.buttonWordPress(word, index);
          }}
        />
      ))}
    </View>
  );
}

function buttonColor(
  word: string,
  index: number,
  greenWord: string,
  redButtons: number[],
) {
  if (word === greenWord) return ThemeColors.buttonGreen;
  if (redButtons.includes(index)) return ThemeColors.red;
  return undefined;
}
