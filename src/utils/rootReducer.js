import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import AppReducer from '../components/App/reducer';
import DashboardReducer from '../pages/HomePage/reducer';
import LeadCreationReducer from '../pages/LeadCreationPage/reducer';
import DownloadReducer from '../components/DownloadModal/reducer';
import MissionReducer from '../pages/MissionFollowUp/reducer';
import SelectionProfilReducer from '../pages/ProfileSelection/reducer';
import MyProfileReducer from '../pages/MyProfile/reducer';
import ContactReducer from '../components/ContactModale/reducer';
import AdministrativeReducer from '../pages/AdministrativePage/reducer';
import UploadReducer from '../components/Inputs/Upload/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  dashboard: DashboardReducer,
  Mission: MissionReducer,
  Download: DownloadReducer,
  leadCreation: LeadCreationReducer,
  SelectionProfil: SelectionProfilReducer,
  Contact: ContactReducer,
  Administrative: AdministrativeReducer,
  Upload: UploadReducer,
  MyProfile: MyProfileReducer
});
