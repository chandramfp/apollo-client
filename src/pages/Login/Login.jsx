import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Button,
  CssBaseline,
  Typography,
  Box,
  Container,
  Avatar,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';

import { Redirect } from 'react-router-dom';
import ls from 'local-storage';

import callApi from '../../lib/utils/api';
import { MyContext } from '../../contexts/index';

const schema = yup.object().shape({
  email: yup.string().email()
    // .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/)
    .required()
    .label('Email Address'),
  password: yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain 8 characters at least one uppercase one lowercase and one number')
    .required('password is required'),
});

const Spinner = () => (
  <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" className="zoom2" height="20" alt="spinner" />
);

const useStyles = (theme) => ({

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  box: {
    marginTop: theme.spacing(16),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signin: '',
      errors: {},
      touched: {
        email: false,
        password: false,
      },
      message: '',
      loading: false,
      Redirect: false,
    };
  }

  handlerOnChangeEmailField = (e) => {
    this.setState({ email: e.target.value });
  }

  handlerOnChangePasswordField = (e) => {
    this.setState({ password: e.target.value });
  }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({ touched: { ...touched, [field]: true } });
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

  handleClickLogin = async (Data, openSnackBar) => {
    this.setState({
      loading: true,
      hasError: true,
    });

    // const response = await callApi(
    //   'post',
    //   '/user/login',
    //   {
    //     data: Data,
    //     headers: {
    //       Authorization: ls.get('token'),
    //     },
    //   },
    // );

    const { loginUser } = this.props;
    const { email, password } = Data;
    const response = await loginUser({ variables: { email, password } });
    ls.set('token', response.data.loginUser);

    this.setState({ loading: false });

    const TokenGen = ls.get('token');

    if (TokenGen !== 'undefined') {
      this.setState({
        redirect: true,
        hasError: false,
      });
    } else {
      this.setState({
        message: 'Invalid email and Password',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/Trainee" />;
    }
  }

  formReset = () => {
    this.setState({
      email: '',
      password: '',
      touched: {},
    });
  }

  render() {
    const { classes } = this.props;
    const { email, password, loading } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mx="auto" p={2} className={classes.box} boxShadow={3}>
          <div className={classes.container}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                fullWidth
                margin="normal"
                helperText={this.getError('email')}
                onChange={this.handlerOnChangeEmailField}
                error={this.getError('email')}
                onBlur={() => this.isTouched('email')}
                id="outlined-required"
                label="Email Address"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                helperText={this.getError('password')}
                onChange={this.handlerOnChangePasswordField}
                error={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                id="outlined-required"
                type="password"
                label="password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <MyContext.Consumer>
                {({ openSnackBar }) => (
                  <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={this.hasErrors()}
                    onClick={() => {
                      this.handleClickLogin({ email, password }, openSnackBar);
                      this.formReset();
                    }}
                  // onClick={() => callApi({ email, password })}
                  >
                    {loading && (
                      <Spinner />
                    )}
                    {loading && <span>Signing in</span>}
                    {!loading && <span>Sign in</span>}
                    {this.renderRedirect()}
                    {/* Sign In */}
                  </Button>
                )}
              </MyContext.Consumer>
            </form>
          </div>
        </Box>
      </Container>

    );
  }
}

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  loginUser: PropTypes.func.isRequired,

};

export default withStyles(useStyles)(Login);
