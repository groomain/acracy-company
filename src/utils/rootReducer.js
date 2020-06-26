import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import AppReducer from '../components/App/reducer';
import LeadCreationReducer from '../pages/LeadCreationPage/reducer';
import DownloadReducer from '../components/DownloadModal/reducer';
import MissionReducer from '../pages/MissionFollowUp/reducer';
import SelectionProfilReducer from '../pages/ProfileSelection/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  Mission: MissionReducer,
  Download: DownloadReducer,
  leadCreation: LeadCreationReducer,
  SelectionProfil: SelectionProfilReducer
});
