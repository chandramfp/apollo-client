import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';


const AuthLayout = ({ children, ...rest }) => (
  <div className="page page-login">
    <div className="main">{children}</div>
    <Footer />
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.object.isRequired,
};


export default AuthLayout;
