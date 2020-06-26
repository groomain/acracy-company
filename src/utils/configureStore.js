import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router/immutable';
import homeSaga from '../components/App/sagas';
import dashboardSagas from '../pages/HomePage/sagas';
import SelectionProfil from '../pages/ProfileSelection/sagas';
import createRootReducer from './rootReducer';
import leadCreationSaga from "../pages/LeadCreationPage/sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  sagaMiddleware.run(homeSaga);
  sagaMiddleware.run(dashboardSagas);
  sagaMiddleware.run(leadCreationSaga);
  sagaMiddleware.run(SelectionProfil);

  return store;
}
