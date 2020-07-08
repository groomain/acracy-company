import { all, put, takeLatest, delay } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import {
  getCompanySuccess, getCompanyFailure, putCompanySuccess, putCompanyFailure,
  getAttachmentsSuccess, getAttachmentsFailure, uploadAttachmentSuccess, uploadAttachmentFailure, deleteAttachmentSuccess, deleteAttachmentFailure
} from './reducer';
import { config } from '../../conf/amplify';
import { push } from "connected-react-router";
import { openSnackBar } from "../../components/App/reducer";
import companyMock from '../../mock/company'

function* getCompany(action) {
  // TODO récupérer l'id de l'entreprise
  try {
    let companyData = companyMock;
    // const companyData = yield API.get(config.apiGateway.NAME, `/companies/${id}`, {
    //   headers: {
    //     'x-api-key': config.apiKey
    //   }
    // });

    yield delay(2000); // for mock
    yield put(getCompanySuccess(companyData));
  } catch (error) {
    console.log(error);
    yield put(getCompanyFailure());
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
    yield put(push('/'));
  }
}

function* doUpdateCompany(action) {
  console.log('action :', action.payload);
  try {
    let companyData = companyMock;
    //     const companyData = yield API.put(config.apiGateway.NAME, `/companies/${id}`, {
    //       header: {
    //         'x-api-key': config.apiKey
    //       },
    // body: action.payload
    // })
    yield put(putCompanySuccess(companyData))
    yield put(openSnackBar({ message: "Vos données ont bien été enregistrées", error: false }));
  } catch (error) {
    yield put(putCompanyFailure())
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}



function* doGetAttachments() {
  try {
    const attachments = yield API.get(config.apiGateway.NAME, `/attachments`, {
      header: {
        'x-api-key': config.apiKey
      },
    })
    yield put(getAttachmentsSuccess(attachments))
  } catch (error) {
    yield put(getAttachmentsFailure())
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}

function* doUploadAttachment() {
  try {
    const attachment = yield API.post(config.apiGateway.NAME, `/attachments`, {
      header: {
        'x-api-key': config.apiKey
      },
    })
    yield put(uploadAttachmentSuccess(attachment))
    yield put(openSnackBar({ message: "Votre document a bien été uploadé", error: false }));
  } catch (error) {
    yield put(uploadAttachmentFailure())
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}

function* doDeleteAttachment(action) {
  const { id } = action.payload;
  try {
    const attachment = yield API.delete(config.apiGateway.NAME, `/attachments/${id}`, {
      header: {
        'x-api-key': config.apiKey
      },
    })
    yield put(deleteAttachmentSuccess(attachment))
    // utiliser le nom du doc dans la snackbar ??
    yield put(openSnackBar({ message: "Votre document a bien été supprimé", error: false }));
  } catch (error) {
    yield put(deleteAttachmentFailure())
    yield put(openSnackBar({ message: "Une erreur est survenue", error: true }));
  }
}

export default function* administrativeSaga() {
  yield all([
    takeLatest('Administrative/getCompanyLaunched', getCompany),
    takeLatest('Administrative/putCompanyLaunched', doUpdateCompany),
    takeLatest('Administrative/getAttachmentsLaunched', doGetAttachments),
    takeLatest('Administrative/uploadAttachmentLaunched', doUploadAttachment),
    takeLatest('Administrative/deleteAttachmentLaunched', doDeleteAttachment)
  ]);
}
