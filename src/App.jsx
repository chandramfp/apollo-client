import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import ls from 'local-storage';
import { AuthRoute, PrivateRoute } from './routes/index';
import {
  Login, TextFieldDemo, ChildrenDemo, InputDemo, NoMatch,
} from './pages/index';
import Trainee from './pages/Trainee/Trainee';

import SnackBarProvider from './contexts/index';


function App() {
  return (
    <SnackBarProvider>
      {ls.get('token') ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Trainee" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Login" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      )}
    </SnackBarProvider>

  );
}

export default App;
