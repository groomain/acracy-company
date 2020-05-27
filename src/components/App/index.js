import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
// import { useTranslation } from 'react-i18next';
import HomePage from '../../pages/HomePage';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { getCurrentSessionLaunched } from './reducer';
import SignInPage from '../../pages/SignIn';
import SignUpPage from '../../pages/SignUp';
import ForgotPassword from '../../pages/ForgotPassword';
import FirstLoginPage from '../../pages/FirstLogin';
import MyAccount from "../../pages/MyAccount";
import CustomAppBar from "../AppBar";
import ProgressBar from "../ProgressBar";

function App() {
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(state => state.getIn(['app', 'isAuthenticating']), null);
  const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);
  // const { i18n } = useTranslation();

  useEffect(() => {
    dispatch(getCurrentSessionLaunched({ fromPath: '/' }));
  }, [dispatch]);

  const appSwitch = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PublicRoute exact path="/login" fixed component={SignInPage} />
      <PublicRoute exact path="/signup" fixed component={SignUpPage} />
      <PublicRoute exact path="/password" fixed component={ForgotPassword} />
      <PrivateRoute exact path="/firstlogin" fixed component={FirstLoginPage} />
      <PrivateRoute exact path="/home" fixed component={HomePage} />
      <PrivateRoute exact path="/account" fixed component={MyAccount} />
    </Switch>
  );

  return (
    <div>
      {/*/!* __NavbarStart__ Replace this whit your navbar *!/*/}
      {/*<div>*/}
      {/*<button*/}
      {/*type="button"*/}
      {/*style={{ marginRight: 20 }}*/}
      {/*onClick={() => { i18n.changeLanguage('fr'); }}*/}
      {/*>*/}
      {/*FR*/}
      {/*</button>*/}
      {/*<button*/}
      {/*type="button"*/}
      {/*onClick={() => { i18n.changeLanguage('en'); }}*/}
      {/*>*/}
      {/*ENG*/}
      {/*</button>*/}
      {/*</div>*/}
      {/*/!* __NavbarEnd__ *!/*/}
      {
        !isAuthenticated && <CustomAppBar />
      }
      <ProgressBar />
      {
        isAuthenticating ? 'Loading...' : appSwitch
      }
    </div>
  );
}

export default App;
