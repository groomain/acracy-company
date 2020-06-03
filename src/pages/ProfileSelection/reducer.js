import Immutable
  // , {fromJS} 
  from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  selectionProfilData: null,
  selectionProfilLoading: false
});

const { actions, reducer } = createSlice({
  slice: 'SelectionProfil',
  name: 'SelectionProfil',
  initialState,
  reducers: {
    // GETCURRENT
    getSelectionProfilLaunched: (state, action) => state
      .set('selectionProfilLoading', true)
      .set('selectionProfilData', null),
    getSelectionProfilSuccess: (state, action) => state
      .set('selectionProfilLoading', true)
      .set('selectionProfilData', action.payload),
    getSelectionProfilFailure: (state, action) => state
      .set('selectionProfilLoading', false)
      .set('selectionProfilData', null)
  }
});

export const {
  getSelectionProfilLaunched,
  getSelectionProfilSuccess,
  getSelectionProfilFailure
} = actions;

export default reducer;
