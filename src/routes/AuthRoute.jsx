import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AuthLayout } from '../layouts/index';


const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.object.isRequired,

};

export default AuthRoute;
