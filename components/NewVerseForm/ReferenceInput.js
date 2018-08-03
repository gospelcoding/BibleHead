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
  const verse = props.verse;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={verse.bookId}
          onValueChange={value => {
            props.updateVerse({ bookId: value });
          }}
        >
          {BibleBook.books.map((book, id) => {
            return <Picker.Item key={id.toString()} label={book} value={id} />;
          })}
        </Picker>
        <ChapterVerseInput
          chapter={verse.startChapter}
          verse={verse.startVerse}
          validChapter={isValidStartChapter(verse.startChapter)}
          validVerse={isValidStartVerse(verse.startVerse)}
          updateChapter={c => {
            props.updateVerse({ startChapter: c });
          }}
          updateVerse={v => {
            props.updateVerse({ startVerse: v });
          }}
        />
      </View>
      <EndReferenceInput
        multiverse={props.multiverse}
        chapter={verse.endChapter}
        verse={verse.endVerse}
        validChapter={isValidEndChapter(verse.endChapter, verse.startChapter)}
        validVerse={isValidEndVerse(
          verse.endVerse,
          verse.startVerse,
          verse.endChapter,
          verse.startChapter
        )}
        updateChapter={c => {
          props.updateVerse({ endChapter: c });
        }}
        updateVerse={v => {
          props.updateVerse({ endVerse: v });
        }}
        setMultiverse={() => {
          props.updateState({ multiverse: true });
        }}
      />
    </View>
  );
}

ReferenceInput.propTypes = {
  verse: PropTypes.shape({
    bookId: PropTypes.number.isRequired,
    startChapter: PropTypes.number.isRequired,
    startVerse: PropTypes.number.isRequired,
    endChapter: PropTypes.number.isRequired,
    endVerse: PropTypes.number.isRequired
  }),
  updateVerse: PropTypes.func.isRequired
};
