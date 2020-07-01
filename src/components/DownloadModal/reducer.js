import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  fileLoading: false,
  file: null,
});

const { actions, reducer } = createSlice({
  slice: 'Download',
  name: 'Download',
  initialState,
  reducers: {
    // GET file
    downloadFileLaunched: (state, action) => state
        .set('fileLoading', true)
        .set('file', null),
    downloadFileSuccess: (state, action) => state
        .set('fileLoading', false)
        .set('file', action.payload),
    downloadFileFailure: (state, action) => state
        .set('fileLoading', false)
        .set('file', null),
  }
});

export const {
  downloadFileLaunched,
  downloadFileSuccess,
  downloadFileFailure,
} = actions;

export default reducer;
