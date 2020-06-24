import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { Grid } from '@material-ui/core';
import HomePage from '../../pages/HomePage';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import { getCurrentSessionLaunched } from './reducer';
import SignInPage from '../../pages/SignIn';
import SignUpPage from '../../pages/SignUp';
import ConfirmSignupPage from '../../pages/ConfirmSignUp';
import ForgotPassword from '../../pages/ForgotPassword';
import FirstLoginPage from '../../pages/FirstLogin';
import MyAccount from "../../pages/MyAccount";
import CustomAppBar from "../AppBar";
import ProgressBar from "../ProgressBar";
import CustomLoader from '../Loader';
import MissionFollowUp from "../../pages/MissionFollowUp";

function App() {
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(state => state.getIn(['app', 'isAuthenticating']), null);
  const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);

  useEffect(() => {
    dispatch(getCurrentSessionLaunched({ fromPath: '/' }));
  }, [dispatch]);

  const appSwitch = (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PublicRoute exact path="/login" fixed component={SignInPage} />
      <PublicRoute exact path="/signup" fixed component={SignUpPage} />
      <PublicRoute exact path="/confirm-signup" fixed component={ConfirmSignupPage} />
      <PublicRoute exact path="/password" fixed component={ForgotPassword} />
      <PublicRoute exact path="/mission" fixed component={MissionFollowUp} />
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
      {isAuthenticating
        ? <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
          <CustomLoader size={70} />
        </Grid>
        : appSwitch
      }
    </div>
  );
}

export default App;
