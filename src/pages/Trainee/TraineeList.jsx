import React, { Component, Fragment } from 'react';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import Compose from 'lodash.flowright';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
import trainee from './data/trainee';
import { TableContainer } from '../../components/index';
import getDateFormatted from './helper';
import EditDialog from '../../components/EditDialog/EditDialog';
import RemoveDialog from '../../components/RemoveDialog/RemoveDialog';
import { MyContext } from '../../contexts';
import { GET_TRAINEE } from './query';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { UPDATED_TRAINEE_SUB, DELETED_TRAINEE_SUB } from './subscription';

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
      rowsPerPage: 20,
      // rowData: [],
      // loading: false,
      // count: 0,
      message: '',

    };
  }

  // componentDidMount = () => {
  //   this.handleTable(0);
  // }

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getTrainee: { records } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...records].map((record) => {
          if (record.originalId === traineeUpdated.originalId) {
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getTrainee: {
            ...prev.getTrainee,
            ...prev.getTrainee.count - 1,
            records: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const {
          getTrainee: { records, count },
        } = prev;
        const {
          data: { traineeDeleted },
        } = subscriptionData;
        const updateRecords = [...records].filter(
          (record) => traineeDeleted !== record.originalId,
        );
        return {
          getTrainee: {
            ...prev.getTrainee,
            count: count - 1,
            records: updateRecords,
          },
        };
      },
    });
  }

  openDialog = (status) => {
    this.setState({ open: status });
  };

  onSubmit = async (data, createTrainee, openSnackBar) => {
    const { name, email, password } = data;
    const response = await createTrainee({ variables: { name, email, password } });
    if (response) {
      this.setState({
        message: 'Trainee created successfully',
        open: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }
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

  handleClick = async (data, openSnackBar, updateTrainee) => {
    const { name, email, id } = data;
    const response = await updateTrainee({ variables: { name, email, id } });
    if (response) {
      this.setState({
        message: 'Trainee updated successfully',
        EditOpen: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }
  };

  handleDeleteClick = async (data, openSnackBar, deleteTrainee) => {
    const { page, rowsPerPage } = this.state;
    const {
      data: {
        getTrainee: { count = 0, records } = {},
        refetch,
      },
    } = this.props;

    const { id } = data;
    const response = await deleteTrainee({ variables: { id } });
    if (response) {
      this.setState({
        message: 'Trainee deleted successfully',
        RemoveOpen: false,
      }, () => { const { message } = this.state; openSnackBar(message, 'success'); });
    }
    // if (count - page * rowsPerPage === 1 && page > 0) {
    //   this.setState({
    //     page: page - 1,
    //   });
    //   refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    // }
    if (records.length === 1 && page > 0) {
      this.setState({ page: page - 1 });
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    } else if (records.length === 1 && page === 0 && count > 0) {
      refetch({ skip: (page) * rowsPerPage, limit: rowsPerPage });
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

    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    return (
      <Mutation mutation={DELETE_TRAINEE}>
        {(deleteTrainee, loaderDelete = { loading }) => (
          <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
            {(createTrainee, loaderCreate = { loading }) => (
              <Mutation
                mutation={UPDATE_TRAINEE}
              >
                {(updateTrainee, loaderUpdate = { loading }) => (
                  <MyContext.Consumer>
                    {({ openSnackBar }) => (
                      <>
                        <div className={classes.root}>
                          <Button variant="outlined" color="primary" onClick={() => this.openDialog(true)}>
                            ADD TRAINEE
                          </Button>
                        </div>
                        <EditDialog
                          data={edata}
                          onClose={this.handleClick}
                          // onSubmit={this.handleClick}
                          onSubmit={
                            (data) => this.handleClick(data, openSnackBar, updateTrainee)
                          }
                          open={EditOpen}
                          loading={loaderUpdate}
                        />
                        <RemoveDialog
                          data={deleteData}
                          // onClose={this.handleDeleteClick}
                          onClose={() => this.handleClose(false)}
                          // onSubmit={this.handleDeleteClick}
                          onSubmit={
                            (data) => this.handleDeleteClick(data, openSnackBar, deleteTrainee)
                          }
                          open={RemoveOpen}
                          loading={loaderDelete}
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
                          // onSubmit={() => this.onSubmit}
                          onSubmit={
                            (data) => this.onSubmit(data, createTrainee, openSnackBar)
                          }
                          open={open}
                          loading={loaderCreate}
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
                    )}
                  </MyContext.Consumer>
                )}

              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
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
      variables: { skip: 0, limit: 20 },
    },
  }),
)(Trainee);
