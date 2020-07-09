import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  uploadFileLoading: false,
  leadAttachmentId: null,
  deleteFileLoading: false,
});

const { actions, reducer } = createSlice({
  slice: 'Upload',
  name: 'Upload',
  initialState,
  reducers: {
    // File upload
    uploadFileLaunched: (state, action) => state
      .set('uploadFileLoading', true),
    uploadFileSuccess: (state, action) => state
      .set('uploadFileLoading', false)
      .set('leadAttachmentId', action.payload),
    uploadFileFailure: (state, action) => state
      .set('uploadFileLoading', false)
      .set('leadAttachmentId', null),
    // Delete Uploaded File
    deleteAttachmentLaunched: (state, action) => state
      .set('deleteFileLoading', true),
    deleteAttachmentSuccess: (state, action) => state
      .set('deleteFileLoading', false),
    deleteAttachmentFailure: (state, action) => state
      .set('deleteFileLoading', false)
  }
});

export const {
  uploadFileLaunched,
  uploadFileSuccess,
  uploadFileFailure,
  //
  deleteAttachmentLaunched,
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
} = actions;

export default reducer;
