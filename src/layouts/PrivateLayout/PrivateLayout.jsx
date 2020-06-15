import React from 'react';
import PropTypes from 'prop-types';
import { ButtonAppBar } from '../components';


const PrivateLayout = ({ children }) => (
  <div className="page page-dashboard">
    <ButtonAppBar />
    <br />
    <div className="main">{children}</div>
  </div>
);


PrivateLayout.propTypes = {
  children: PropTypes.object.isRequired,

};

export default PrivateLayout;
