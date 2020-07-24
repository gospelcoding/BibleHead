import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Verse, compareVerses} from '../verses/Verse';

const versesSlice = createSlice({
  name: 'verses',
  initialState: [] as Verse[],
  reducers: {
    addVerse: (state, action: PayloadAction<Verse>) => {
      state.push(action.payload);
      state.sort(compareVerses);
    },
  },
});

export default versesSlice;
