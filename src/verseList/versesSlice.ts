import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Verse, compareVerses} from '../verses/Verse';
import draftVerseSlice from '../addVerse/draftVerseSlice';

export type VersesState = {
  verses: Verse[];
  nextId: number;
};

const versesSlice = createSlice({
  name: 'verses',
  initialState: {
    verses: [],
    nextId: 1,
  } as VersesState,
  reducers: {
    add: (state, action: PayloadAction<Verse[]>) =>
      addVerses(state, action.payload),
    update: (state, action: PayloadAction<Verse>) =>
      updateVerse(state, action.payload),
    toggleLearned: (state, action: PayloadAction<number>) => {
      const verse = state.verses.find((v) => v.id == action.payload);
      if (verse) verse.learned = !verse.learned;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(draftVerseSlice.actions.saveDraftVerse, (state, action) => {
      if (action.payload.id == 0) addVerses(state, [action.payload]);
      else updateVerse(state, action.payload);
    }),
});

function addVerses(state: VersesState, verses: Verse[]) {
  verses.forEach((verse) => {
    state.verses.push({...verse, id: state.nextId});
    ++state.nextId;
  });
  state.verses.sort(compareVerses);
}

function updateVerse(state: VersesState, verse: Verse) {
  const index = state.verses.findIndex((v) => v.id == verse.id);
  if (index >= 0) {
    state.verses[index] = verse;
    state.verses.sort(compareVerses);
  }
}

export default versesSlice;
