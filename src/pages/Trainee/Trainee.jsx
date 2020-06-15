import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';


const Trainee = (props) => {
  const { match: { path } } = props;
  return (
    <>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:Traineeid`} component={TraineeDetail} />
      </Switch>

    </>
  );
};


Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Trainee;
