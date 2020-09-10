import { all, put, takeLatest, delay } from 'redux-saga/effects';
import { API } from 'aws-amplify';
import { push } from 'connected-react-router';
import { config } from '../../conf/amplify';
import {
  leadSaveSuccess, leadSaveFailure, getLeadDraftSuccess, getLeadDraftFailure,
  putLeadDraftSuccess, putLeadDraftFailure, changeLeadStatusLaunched, changeLeadStatusSuccess, changeLeadStatusFailure, getExpertisesSuccess,
  getExpertisesFailure, getSensitivitiesSuccess, getSensitivitiesFailure, uploadFileSuccess, uploadFileFailure, deleteAttachmentSuccess, deleteAttachmentFailure
} from "./reducer";
import { setLeadCreationStep } from '../HomePage/reducer';

import { openSnackBar, handleCurrentStep } from "../../components/App/reducer";
import { s3Upload } from "../../utils/services/awsLib";

// mocks
// import expertise from '../../mock/expertises.json';
// import sensitivity from '../../mock/sensitivities.json';

function* doLeadSave(action) { // create a new lead
  const { values, redirect, redirectToMission } = action.payload;
  try {
    const leadId = yield API.post(config.apiGateway.NAME, '/leads', {
      headers: {
        'x-api-key': config.apiKey
      },
      body: { desireds: values.desireds, missionContext: values.missionContext, search: values.search }
    });

    yield put(leadSaveSuccess(leadId));
    if (redirect === "HELP_NEEDED") {
    } else if (redirect) {
      yield put(push('/home'));
      yield put(handleCurrentStep(0));
    }
    else if (redirectToMission) {
      yield put(changeLeadStatusLaunched({ leadId, status: 'FINALIZE' }))
      yield put(push('/home')); // Will be changed to /brief/:id
      yield put(handleCurrentStep(0));
    }
    else {
      yield put(setLeadCreationStep(1))
      yield put(push(`/lead/${leadId.leadId}`))
    }
  } catch (error) {
    yield put(leadSaveFailure());
    yield put(openSnackBar({ message: "Oups, une erreur est survenue, merci de réessayer plus tard", error: true }));
  }
}

function* doGetLeadDraft(action) { // get a lead's data
  const id = action.payload;
  try {
    const draft = yield API.get(config.apiGateway.NAME, encodeURI(`/leads/${id}`),
      {
        headers: {
          'x-api-key': config.apiKey
        }
      });

    yield put(getLeadDraftSuccess(draft));
  } catch (error) {
    yield put(getLeadDraftFailure());
  }
}

function* doUpdateLeadDraft(action) { // update an existing lead

  const { leadId, values, redirect, redirectToMission } = action.payload;

  let valuesToSend = {
    search: values.search,
    desireds: values.desireds,
    missionContext: values.missionContext,
    missionDetail: values.missionDetail,
    missionRequirements: values.missionRequirements
  }

  delete valuesToSend?.missionDetail?.sharedDocuments
  try {
    const draft = yield API.put(config.apiGateway.NAME, encodeURI(`/leads/${leadId}`),
      {
        headers: {
          'x-api-key': config.apiKey
        },
        body: valuesToSend

      });

    yield put(putLeadDraftSuccess(draft));
    if (redirect) {
      yield put(push('/home'));
      yield put(setLeadCreationStep(0));
    }
    else if (redirectToMission) {
      yield put(changeLeadStatusLaunched({ leadId, status: 'FINALIZE' }))
      yield put(push('/home')); // Will be changed to /brief/:id
      yield put(handleCurrentStep(0));
    }
    else { yield put(setLeadCreationStep(1)) };
  } catch (error) {
    yield put(putLeadDraftFailure());
    yield put(openSnackBar({ message: "Oups, une erreur est survenue, merci de réessayer plus tard", error: true }));
  }
}

function* doChangeLeadStatus(action) {  // modify the status of a lead
  const { leadId, status } = action.payload;
  try {
    const update = yield API.post(config.apiGateway.NAME, encodeURI(`/leads/${leadId}/actions/`),
      {
        headers: {
          'x-api-key': config.apiKey
        },
        body: { 'type': status }
      });
    yield delay(500);
    yield put(changeLeadStatusSuccess(update));
    yield put(push('/home'));
    yield put(handleCurrentStep(0));
  } catch (error) {
    yield put(changeLeadStatusFailure());
  }
}

function* doGetExpertises(action) {
  try {
    const expertises = yield API.get(config.apiGateway.NAME, encodeURI('/expertises'),
      {
        headers: {
          'x-api-key': config.apiKey
        },
      });
    yield put(getExpertisesSuccess(expertises));
    // To use the mock, switch with the line below
    // yield put(getExpertisesSuccess(expertise));
  } catch (error) {
    yield put(getExpertisesFailure());
  }
}

function* doGetSensitivities(action) {
  try {
    const sensitivities = yield API.get(config.apiGateway.NAME, encodeURI('/sensitivities'),
      {
        headers: {
          'x-api-key': config.apiKey
        },
      });
    yield put(getSensitivitiesSuccess(sensitivities));
    // To use the mock, switch with the line below
    // yield put(getSensitivitiesSuccess(sensitivity));
  } catch (error) {
    yield put(getSensitivitiesFailure());
  }
}

function* doUploadFile(action) {
  const payload = action.payload[0];

  if (payload.file.size < 1.5e+7)
    try {
      const storedKey = yield s3Upload(`${payload.leadId}-${payload.file.name}`, payload.file);
      const tempLeadAttachmentId = yield API.post(config.apiGateway.NAME, encodeURI('/attachments'),
        {
          headers: {
            'x-api-key': config.apiKey
          },
          body: {
            type: 'MISSION_SHARED_DOCUMENT',
            name: payload.file.name,
            filename: storedKey,
            payload: {
              leadId: payload.leadId
            }
          }
        });
      const { attachmentId } = tempLeadAttachmentId;
      yield put(uploadFileSuccess(attachmentId));
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


export default function* LeadCreationSaga() {
  yield all([
    takeLatest('LeadCreation/leadSaveLaunched', doLeadSave),
    takeLatest('LeadCreation/getLeadDraftLaunched', doGetLeadDraft),
    takeLatest('LeadCreation/putLeadDraftLaunched', doUpdateLeadDraft),
    takeLatest('LeadCreation/changeLeadStatusLaunched', doChangeLeadStatus),
    takeLatest('LeadCreation/getExpertisesLaunched', doGetExpertises),
    takeLatest('LeadCreation/getSensitivitiesLaunched', doGetSensitivities),
    takeLatest('LeadCreation/uploadFileLaunched', doUploadFile),
    takeLatest('LeadCreation/deleteAttachmentLaunched', doDeleteAttachment),
  ]);
}
