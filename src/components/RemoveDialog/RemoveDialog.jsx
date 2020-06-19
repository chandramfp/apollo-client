import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

class RemoveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
    // this.state = {
    //   message: '',
    //   loading: false,
    //   error: false,
    // };
  }

  render = () => {
    const {
      onClose, open, data, onSubmit, loading: { loading },
    } = this.props;
    // const { loading, error } = this.state;
    const { originalId: id } = data;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                onSubmit({ id });
              }}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={15} color="inherit" />
              )}
              {loading && <span>Deleting</span>}
              {!loading && <span>Delete</span>}
            </Button>

          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default RemoveDialog;

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};
