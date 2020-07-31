import Immutable from 'immutable';
import { createSlice } from "@reduxjs/toolkit";

const initialState = Immutable.Map({
  uploadFileLoading: false,
  leadAttachmentId: null,
  deleteFileLoading: false,
  getAttachmentsLoading: false,
  attachments: null,
  getAttachmentsError: null
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
      .set('deleteFileLoading', false),
    // GET attachments
    getAttachmentsLaunched: (state, action) => state
        .set('getAttachmentsLoading', true)
        .set('getAttachmentsError', null)
        .set('attachments', null),
    getAttachmentsSuccess: (state, action) => state
        .set('getAttachmentsLoading', false)
        .set('attachments', action.payload),
    getAttachmentsFailure: (state, action) => state
        .set('getAttachmentsLoading', false)
        .set('attachments', null)
        .set('getAttachmentsError', action.payload),
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
  getAttachmentsLaunched,
  getAttachmentsSuccess,
  getAttachmentsFailure,
} = actions;

export default reducer;
