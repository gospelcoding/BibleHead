import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Verse} from '../verses/Verse';

const learningSlice = createSlice({
  name: 'learning',
  initialState: {
    toReview: [] as number[], // verse ids
    toLearn: [] as number[], // verse ids
  },
  reducers: {
    learnAVerse: (state, action: PayloadAction<Verse>) => {
      state.toLearn = [action.payload.id];
    },
    next: (state) => {
      if (state.toReview.length > 0) state.toReview.pop();
      else state.toLearn.pop();
    },
    clear: () => ({
      toLearn: [],
      toReview: [],
    }),
  },
});

export default learningSlice;
