import React, { Component, Fragment } from 'react';
import ls from 'local-storage';
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
import callApi from '../../lib/utils/api';


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
      rowData: [],
      loading: false,
      count: 0,
      message: '',

    };
  }


  componentDidMount = () => {
    this.handleTable(0);
  }


  openDialog = (status) => {
    this.setState({ open: status });
  };


  onSubmit = () => {
    const { page } = this.state;
    this.setState({ open: false }, () => { this.handleTable(page); });
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
      page: '',
    });
  }

  handleTable = (newPage) => {
    this.setState({ loading: true });
    const { rowsPerPage } = this.state;
    const value = this.context;
    callApi(
      'get',
      '/trainee',
      {
        params: { skip: newPage * rowsPerPage, limit: rowsPerPage },
        headers: {
          Authorization: ls.get('token'),
        },
      },
    ).then((res) => {
      if (res.data === undefined) {
        this.setState({
          loading: false,
          message: 'This is an error',
        }, () => {
          const { message } = this.state;
          value.openSnackBar(message, 'error');
        });
      } else {
        this.setState({ rowData: res.data.records, count: res.data.count, loading: false });
      }
    });
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

  handleDeleteClick = (data) => {
    const { count, page, rowsPerPage } = this.state;
    this.setState({ RemoveOpen: false }, () => console.log('Deleted data', data));
    if (count - rowsPerPage * page !== 1) {
      this.handleTable(page);
    } else if (page !== 0) {
      this.handleTable(page - 1);
      this.setState({ page: page - 1 });
    } else {
      this.handleTable(page);
    }
  };

  // handleChangeRowsPerPage = (event) => {
  //   this.handleTable();
  //   this.setState({
  //     rowsPerPage: event.target.value,
  //     page: 0,

  //   });
  // };


  handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
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
      rowsPerPage, edata, deleteData, loading, count, rowData,
    } = this.state;

    // console.log("inside traineelist");
    // console.log("state", loading);

    const { classes } = this.props;

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
          onClose={this.handleDeleteClick}
          onSubmit={this.handleDeleteClick}
          open={RemoveOpen}
        />
        {/* <TableComponent */}
        <TableContainer
          loading={loading}
          data={rowData}
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
          onChangePage={this.handleChangePage}
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
};

export default withStyles(useStyles)(Trainee);
