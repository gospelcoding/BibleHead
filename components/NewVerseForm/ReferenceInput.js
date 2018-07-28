import React from "react";
import PropTypes from "prop-types";
import { View, Picker } from "react-native";
import ChapterVerseInput from "./ChapterVerseInput";
import EndReferenceInput from "./EndReferenceInput";
import {
  isValidStartChapter,
  isValidStartVerse,
  isValidEndChapter,
  isValidEndVerse
} from "../../util/verse_ref_utils";

export default function ReferenceInput(props) {
  const books = ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"];
  return (
    <View>
      <Picker
        selectedValue={props.book}
        onValueChange={value => {
          props.updateState({ book: value });
        }}
      >
        {books.map(book => {
          return <Picker.Item key={book} label={book} value={book} />;
        })}
      </Picker>
      <ChapterVerseInput
        chapter={props.startChapter}
        verse={props.startVerse}
        validChapter={isValidStartChapter(props.startChapter)}
        validVerse={isValidStartVerse(props.startVerse)}
        updateChapter={c => {
          props.updateState({ startChapter: c });
        }}
        updateVerse={v => {
          props.updateState({ startVerse: v });
        }}
      />
      <EndReferenceInput
        multiverse={props.multiverse}
        chapter={props.endChapter}
        verse={props.endVerse}
        validChapter={isValidEndChapter(props.endChapter, props.startChapter)}
        validVerse={isValidEndVerse(
          props.endVerse,
          props.startVerse,
          props.endChapter,
          props.startChapter
        )}
        updateChapter={c => {
          props.updateState({ endChapter: c });
        }}
        updateVerse={v => {
          props.updateState({ endVerse: v });
        }}
        setMultiverse={() => {
          props.updateState({ multiverse: true });
        }}
      />
    </View>
  );
}

ReferenceInput.propTypes = {
  book: PropTypes.string.isRequired,
  startChapter: PropTypes.string.isRequired,
  startVerse: PropTypes.string.isRequired,
  endChapter: PropTypes.string.isRequired,
  endVerse: PropTypes.string.isRequired,
  multiverse: PropTypes.bool,
  updateState: PropTypes.func.isRequired
};
