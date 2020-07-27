import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Verse} from '../verses/Verse';

type DraftVerse = Verse | null;

const draftVerseSlice = createSlice({
  name: 'draftVerse',
  initialState: null as DraftVerse,
  reducers: {
    setDraftVerse: (_, action: PayloadAction<Verse>) => action.payload,
    clearDraftVerse: () => null,
    saveDraftVerse: (_, action: PayloadAction<Verse>) => null,
  },
});

export default draftVerseSlice;
