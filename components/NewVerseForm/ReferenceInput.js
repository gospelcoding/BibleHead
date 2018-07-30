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
import BibleBook from "../../models/BibleBook";

export default function ReferenceInput(props) {
  return (
    <View>
      <Picker
        selectedValue={props.bookId}
        onValueChange={value => {
          props.updateState({ bookId: value });
        }}
      >
        {BibleBook.books.map((book, id) => {
          return <Picker.Item key={id.toString()} label={book} value={id} />;
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
  bookId: PropTypes.number.isRequired,
  startChapter: PropTypes.string.isRequired,
  startVerse: PropTypes.string.isRequired,
  endChapter: PropTypes.string.isRequired,
  endVerse: PropTypes.string.isRequired,
  multiverse: PropTypes.bool,
  updateState: PropTypes.func.isRequired
};
