import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PrivateLayout } from '../layouts/index';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,

};

export default PrivateRoute;
