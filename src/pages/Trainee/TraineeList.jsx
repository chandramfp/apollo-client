import React, { Component, Fragment } from 'react';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
import trainee from './data/trainee';
// import { TableComponent } from '../../components/index';
import { TableContainer } from '../../components/index';
import getDateFormatted from './helper';
import EditDialog from '../../components/EditDialog/EditDialog';
import RemoveDialog from '../../components/RemoveDialog/RemoveDialog';
import { MyContext } from '../../contexts';
import { GET_TRAINEE } from './query';

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(2, 0, 2),
  },
});

class Trainee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      edata: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 10,
      // rowData: [],
      // loading: false,
      // count: 0,
      // message: '',

    };
  }

  // componentDidMount = () => {
  //   this.handleTable(0);
  // }

  openDialog = (status) => {
    this.setState({ open: status });
  };

  onSubmit = () => {
    const { page } = this.state;
    this.setState({ open: false }, () => { this.handleTable(page); });
  };

  handleSort = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
      page: '',
    });
  }

  handleTable = (refetch) => async (event, newPage) => {
    const { rowsPerPage } = this.state;
    await refetch({ skip: newPage * rowsPerPage, limit: rowsPerPage });
    this.setState({ page: newPage });
  }

  openDialog = (status) => {
    this.setState({ open: status });
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, edata: data });
  }

  handleDeleteDialogOpen = (data) => {
    // console.log("dddddddddddddddd", data);
    this.setState({ RemoveOpen: true, deleteData: data });
  }

  handleClick = () => {
    const { page } = this.state;

    this.setState({ EditOpen: false }, () => { this.handleTable(page); });
  };

  handleDeleteClick = (refetch) => () => {
    const { page, rowsPerPage } = this.state;
    const {
      data: {
        getTrainee: { count = 0 } = {},
      },
    } = this.props;
    this.setState({
      RemoveOpen: false,
    });
    if (count - page * rowsPerPage !== 1) {
      refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
    } else if (page !== 0) {
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    } else {
      refetch({ skip: page * rowsPerPage, limit: rowsPerPage });
    }
  };

  handleClose = (status) => {
    this.setState({ EditOpen: status, RemoveOpen: status });
  };

  handleChangePage = (event, newPage) => {
    // console.log('newPage', newPage);
    this.handleTable(newPage);
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,

    });
  };

  render() {
    const {
      open, order, orderBy, EditOpen, RemoveOpen, page,
      rowsPerPage, edata, deleteData,
    } = this.state;

    // console.log("inside traineelist");
    // console.log("state", loading);

    const {
      classes,
      data: {
        getTrainee: { records = [], count = 0 } = {},
        refetch,
        loading,
      },
    } = this.props;

    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={() => this.openDialog(true)}>
            ADD TRAINEE
          </Button>
        </div>
        <EditDialog
          data={edata}
          onClose={this.handleClick}
          onSubmit={this.handleClick}
          open={EditOpen}
        />
        <RemoveDialog
          data={deleteData}
          // onClose={this.handleDeleteClick}
          onClose={() => this.handleClose(false)}
          // onSubmit={this.handleDeleteClick}
          onSubmit={this.handleDeleteClick(refetch)}
          open={RemoveOpen}
        />
        {/* <TableComponent */}
        <TableContainer
          loading={loading}
          data={records}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
                align: 'center',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]
          }
          actions={
            [
              {
                icon: <EditIcon />,
                handler: this.handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: this.handleDeleteDialogOpen,
              },
            ]
          }
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          // onChangePage={this.handleChangePage}
          onChangePage={this.handleTable(refetch)}
        />
        <AddDialog
          onClose={() => this.openDialog(false)}
          onSubmit={() => this.onSubmit}
          open={open}
        />
        <ul>
          {
            trainee && trainee.length && trainee.map((element) => (
              <Fragment key={element.id}>
                <li key={element.id}>
                  <Link to={`/Trainee/${element.id}`}>{element.name}</Link>
                </li>
              </Fragment>
            ))
          }
        </ul>
      </>
    );
  }
}

Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

Trainee.contextType = MyContext;
export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: {
      variables: { skip: 0, limit: 10 },
    },
  }),
)(Trainee);
