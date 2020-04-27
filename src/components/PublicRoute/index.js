import React from 'react';
import { Route } from 'react-router';

const publicRender = (Component, rest) => (props) => {
  let result = null;
  if (rest.fixed) {
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
  return result;
};

const PublicRoute = ({ component: Component, ...rest }) => <Route {...rest} render={publicRender(Component, rest)} />;

export default PublicRoute;
