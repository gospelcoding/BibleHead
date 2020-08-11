import React, {useState, useRef, Ref} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {Verse, verseReviewText, refText} from '../verses/Verse';
import ButtonRowReviewFinal from './ButtonRowReviewFinal';
import ButtonRowShowWords from './ButtonRowShowWords';
import BHText from '../components/BHText';

interface IProps {
  verse: Verse;
  done: () => void;
}

const isIOS = Platform.OS == 'ios';

export default function ShowWordsGame(props: IProps) {
  const [splitIndex, setSplitIndex] = useState(0);

  const verseText = verseReviewText(props.verse);
  const gameText = verseText.slice(0, splitIndex);

  const scrollViewRef = useRef<ScrollView>(null);

  const nextSplitIndex = (pattern: RegExp) => {
    const remainder = verseText.slice(splitIndex);
    const match = pattern.exec(remainder);
    return match === null
      ? verseText.length
      : match[0].length + match.index + splitIndex;
  };

  const scroll = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 50);
  };

  const normalStep = () => {
    setSplitIndex(nextSplitIndex(/\s+/));
    scroll();
  };

  const bigStep = () => {
    // Newline or phrase punctuation followed by whitespace
    const pattern = /\n|[.,:;?!”’»)-]\s+/;
    setSplitIndex(nextSplitIndex(pattern));
    scroll();
  };

  const stepToEnd = () => {
    setSplitIndex(verseText.length);
    scroll();
  };

  return (
    <View style={styles.showWordsGame}>
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
        <BHText textBreakStrategy="simple">{gameText}</BHText>
      </ScrollView>
      {splitIndex == verseText.length ? (
        <ButtonRowReviewFinal verse={props.verse} done={props.done} />
      ) : (
        <ButtonRowShowWords
          normalStep={normalStep}
          bigStep={bigStep}
          stepToEnd={stepToEnd}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  showWordsGame: {
    flex: 1,
    backgroundColor: isIOS ? 'white' : undefined,
  },
  gameText: {
    flex: 1,
    fontSize: 24,
    padding: 8,
    backgroundColor: 'white',
    margin: isIOS ? 0 : 8,
    elevation: isIOS ? 0 : 4,
  },
});
