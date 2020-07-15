import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router';
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
import LeadCreationPage from "../../pages/LeadCreationPage";
import MyProfilePage from "../../pages/MyProfile";
import CustomAppBar from "../AppBar";
import ProgressBar from "../ProgressBar";
import ProfileSelection from "../../pages/ProfileSelection";
import CustomLoader from '../Loader';
import MissionFollowUp from "../../pages/MissionFollowUp";
import AdministrativePage from "../../pages/AdministrativePage";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(state => state.getIn(['app', 'isAuthenticating']), null);
  const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);

  useEffect(() => {
    dispatch(getCurrentSessionLaunched({ fromPath: '/' }));
  }, [dispatch]);

  const appSwitch = (
    <Switch>
      {/* PUBLIC ROUTE */}
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <PublicRoute exact path="/login" fixed component={SignInPage} />
      <PublicRoute exact path="/createAccount" fixed component={SignUpPage} />
      <PublicRoute exact path="/confirmAccount" fixed component={ConfirmSignupPage} />
      <PublicRoute exact path="/forgotPassword" fixed component={ForgotPassword} />
      {/* PRIVATE ROUTE */}
      <PrivateRoute exact path="/administrative" fixed component={AdministrativePage} />
      <PrivateRoute exact path="/lead" fixed component={LeadCreationPage} />
      <PrivateRoute exact path="/lead/:id" fixed component={LeadCreationPage} />
      <PrivateRoute exact path="/brief/:id" fixed component={MissionFollowUp} />
      <PrivateRoute exact path="/mission/:id" fixed component={MissionFollowUp} />
      <PrivateRoute exact path="/firstLogin" fixed component={FirstLoginPage} />
      <PrivateRoute exact path="/home" fixed component={HomePage} />
      <PrivateRoute exact path="/myProfile" fixed component={MyProfilePage} />
      <PrivateRoute exact path="/reveal/:id" fixed component={ProfileSelection} />
      {/* REDIRECT WRONG PATH */}
      <Route render={() => <Redirect to="/home" />} />
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
        (!isAuthenticated && location.pathname !== "/lead") && <CustomAppBar />
      }
      <ProgressBar />
      {
        isAuthenticating
          ? <Grid container alignItems='center' justify='center' style={{ height: '100vh' }}>
            <CustomLoader size={70} />
          </Grid>
          : appSwitch
      }
    </div>
  );
}

export default App;
