import { all, put, takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { config } from '../../../conf/amplify';
import { uploadFileSuccess, uploadFileFailure, deleteAttachmentSuccess, deleteAttachmentFailure } from "./reducer";

import { openSnackBar } from "../../../components/App/reducer";

function* doUploadFile(action) {
  const payload = action.payload.files[0];
  const type = action.payload.type;

  if (payload.file.size < 1.5e+7)
    try {
      const leadAttachmentId = yield API.post(config.apiGateway.NAME, encodeURI('/attachments'),
        {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            type: type,
            name: payload.file.name,
            filename: payload.src,
            payload: {
              leadId: payload.leadId
            }
          }
        });
      yield put(uploadFileSuccess(leadAttachmentId));
    } catch (error) {
      yield put(uploadFileFailure());
      yield put(openSnackBar({ message: "Erreur pendant l'envoi du fichier", error: true }));
    } else {
    yield put(openSnackBar({ message: "Taille du fichier max. : 15Mo", error: true }));
  }

}

function* doDeleteAttachment(action) {
  const attachmentId = action.payload;

  try {
    yield API.del(config.apiGateway.NAME, encodeURI(`/attachments/${attachmentId}`),
      {
        headers: {
          'x-api-key': config.apiKey
        }
      });
    yield put(deleteAttachmentSuccess());
  } catch (error) {
    yield put(deleteAttachmentFailure());
  }
}


export default function* UploadSaga() {
  yield all([
    takeLatest('LeadCreation/uploadFileLaunched', doUploadFile),
    takeLatest('LeadCreation/deleteAttachmentLaunched', doDeleteAttachment),
  ]);
}
