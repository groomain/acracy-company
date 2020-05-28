import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import AppReducer from '../components/App/reducer';
import MissionReducer from '../pages/MissionFollowUp/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  Mission: MissionReducer
});
