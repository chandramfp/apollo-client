import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import withLoaderandMessage from '../HOC/index';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CustomizedTables(props) {
  const {
    id, data, columns, onSelect, order, orderBy, onSort, actions, rowsPerPage,
    page, onChangePage, onChangeRowsPerPage, count, loading,
  } = props;

  // console.log("inside Tableee");
  // console.log('??????????????', props);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              columns && columns.length && columns.map(({ align, label, field }) => (
                <TableCell align={align} className={classes.column}>
                  <TableSortLabel
                    align={align}
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={onSort(field)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length || loading ? (
            <>
              {loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <div align="center">
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {
                    data.map((element) => (
                      <StyledTableRow hover key={element[id]}>
                        {
                          columns && columns.length && columns.map(({ field, align, format }) => (

                            <StyledTableCell onClick={(event) => onSelect(event, element.name)} align={align} component="th" scope="row">
                              {format !== undefined ? format(element[field]) : element[field]}
                            </StyledTableCell>

                          ))
                        }
                        <div>
                          {actions && actions.length && actions.map(({ icon, handler }) => (
                            <div onClick={() => handler(element)}>
                              {icon}
                            </div>
                          ))}
                        </div>
                      </StyledTableRow>
                    ))
                  }
                </>
              )}
            </>
          ) : (
            <Box paddingLeft="70%">
              <h2>Oops No more Trainees</h2>
            </Box>
          )}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[0]}
          count={count}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}

CustomizedTables.propTypes = {
  // id: PropTypes.string.isRequired,
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  actions: PropTypes.arrayOf(PropTypes.object),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

CustomizedTables.defaultProps = {
  orderBy: '',
  order: 'asc',
  rowsPerPage: 100,
  actions: {},
  id: '',
};

export default withLoaderandMessage(CustomizedTables);
