import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from '@material-ui/core';
// import ls from 'local-storage';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// import { MyContext } from '../../../../contexts/index';
// import callApi from '../../../../lib/utils/api';

const schema = yup.object().shape({
  name: yup.string().required('Name is required field').min(3, 'minimum 3 character').label('name'),
  email: yup.string().email()
    // .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((successive.tech))$/)
    .required()
    .label('Email Address'),
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'must contain 8 character, atleast one upper letter,one lowercase letter and one number')
    .required('password is required'),
  confirmpassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required('confirm password is required'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },

});

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      errors: {},
      touched: {
        name: false,
        email: false,
        password: false,
        confirmpassword: false,
      },
      isValid: false,
      // loading: false,
      // message: '',
    };
  }

  handlerOnChangeNameField = (e) => {
    this.setState({ name: e.target.value });
  }

  handlerOnChangeEmailField = (e) => {
    this.setState({ email: e.target.value });
  }

  handlerOnChangePasswordField = (e) => {
    this.setState({ password: e.target.value });
  }

  handlerOnChangeConfirmPasswordField = (e) => {
    this.setState({ confirmpassword: e.target.value });
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

  // handleClick = () => {
  //   const { onClose, onSubmit } = this.props;
  //   const { name, password, email } = this.state;
  //   onSubmit(name, password, email);
  //   onClose();
  //   this.setState = '';
  // }

  // apiHandler = async (Data, openSnackBar) => {
  //   this.setState({
  //     loading: true,
  //     hasError: true,
  //   });

  //   const response = await callApi(
  //     'post',
  //     '/trainee',
  //     {
  //       data: Data,
  //       headers: {
  //         Authorization: ls.get('token'),
  //       },
  //     },
  //   );
  //   this.setState({ loading: false, hasError: false });
  //   if (response.status === 'ok') {
  //     this.setState({
  //       hasError: false,
  //       message: 'This is a success message',
  //     }, () => {
  //       const { message } = this.state;
  //       openSnackBar(message, 'success');
  //     });
  //   } else {
  //     this.setState({
  //       hasError: false,
  //       message: 'This is a error message',
  //     }, () => {
  //       const { message } = this.state;
  //       openSnackBar(message, 'error');
  //     });
  //   }
  // }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      isValid: false,
      touched: {},
    });
  }

  render() {
    // console.log('current state', this.state);
    const {
      open, onClose, onSubmit, loading: { loading },
    } = this.props;
    const {
      name, email, password, confirmpassword, isValid,
    } = this.state;
    return (
      <>
        <div>
          <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter your trainee
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: '100%' }}
                    required
                    helperText={this.getError('name')}
                    onChange={this.handlerOnChangeNameField}
                    error={this.getError('name')}
                    value={name}
                    onBlur={() => this.isTouched('name')}
                    id="outlined-required"
                    label="name"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: '100%' }}
                    helperText={this.getError('email')}
                    onChange={this.handlerOnChangeEmailField}
                    error={this.getError('email')}
                    value={email}
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    helperText={this.getError('password')}
                    onChange={this.handlerOnChangePasswordField}
                    error={this.getError('password')}
                    value={password}
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
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    helperText={this.getError('confirmpassword')}
                    onChange={this.handlerOnChangeConfirmPasswordField}
                    error={this.getError('confirmpassword')}
                    value={confirmpassword}
                    onBlur={() => this.isTouched('confirmpassword')}
                    id="outlined-required"
                    label="confirm-password"
                    type="password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              {/* <MyContext.Consumer>
                {({ openSnackBar }) => (
                  <> */}
              <Button
                disabled={!isValid && this.hasErrors()}
                onClick={() => {
                  onSubmit({
                    name, email, password, confirmpassword,
                  });

                  // this.apiHandler({ name, email, password }, openSnackBar);
                  this.formReset();
                }}
                color="primary"
                variant="contained"
              >

                {loading && (
                  <CircularProgress size={15} />
                )}
                {loading && <span>Submiting</span>}
                {!loading && <span>Submit</span>}
              </Button>

              {/* </>
                )}
              </MyContext.Consumer> */}
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

AddDialog.defaultProps = {
  open: '',
  onClose: '',
  onSubmit: '',
};

export default withStyles(useStyles)(AddDialog);
