import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

const privateRender = (Component, isAuthenticated, isAuthenticating, userDynamo, rest) => (props) => {
  const { fixed } = rest;
  // console.log(isAuthenticated);
  let result = null;
  if (isAuthenticating || isAuthenticating === undefined) {
    // DO NOTHING
  } else if (isAuthenticated === true) {
    // User Authentified
    // if (!userDynamo.user.lastName && props.location.pathname !== '/firstlogin') {
    //   result = <Redirect to="/firstlogin" />;
    // } else

    if (fixed) {
      result = (
        <div>
          <Component {...props} />
        </div>
      );
    } else {
      result = (
        <div>
          <Component {...props} />
        </div>
      );
    }
  } else {
    result = (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location.pathname }
        }}
      />
    );
  }
  return result;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.getIn(['app', 'isAuthenticated']), null);
  const isAuthenticating = useSelector(state => state.getIn(['app', 'isAuthenticating']), null);
  const userDynamo = useSelector(state => state.getIn(['app', 'userDynamo']), null);
  return <Route {...rest} render={privateRender(Component, isAuthenticated, isAuthenticating, userDynamo, rest)} />;
};

export default PrivateRoute;
