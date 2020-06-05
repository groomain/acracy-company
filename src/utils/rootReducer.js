import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import AppReducer from '../components/App/reducer';
import DashboardReducer from '../pages/HomePage/reducer';

export default history => combineReducers({
  router: connectRouter(history),
  app: AppReducer,
  dashboard: DashboardReducer
});
