import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableSortLabel,
  TablePagination,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { withLoaderAndMessage } from "../../hoc";
import { CircularProgress } from "../CircularProgress";
import {
  useStyles,
  StyledTableRow,
  StyledTableCell,
  getComparator,
  stableSort,
} from ".";

const GenericTable = ({
  id,
  data,
  column,
  actions,
  orderBy,
  order,
  onSort,
  loading,
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onChangePage,
}) => {
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onSort(event, property);
  };
  return (
    <Paper className={classes.root} elevation={4}>
      <TableContainer className={classes.container}>
        <Table
          id={id}
          className={classes.table}
          stickyHeader
          aria-label="simple table"
        >
          <TableHead onSort={onSort}>
            <StyledTableRow className={classes.headRow}>
              {column.map((head) => (
                <StyledTableCell
                  key={head.field}
                  align={head.align}
                  sortDirection={orderBy === head.field ? order : false}
                >
                  <TableSortLabel
                    disabled={head.field === "actions"}
                    active={orderBy === head.field}
                    direction={orderBy === head.field ? order : "asc"}
                    onClick={createSortHandler(head.field)}
                  >
                    {head.label ? head.label : head.field}
                    {orderBy === head.field ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((row) =>
              loading ? (
                <CircularProgress />
              ) : (
                <StyledTableRow
                  className={classes.tableCells}
                  key={row.originalId}
                >
                  {column.map((item) => (
                    <StyledTableCell
                      key={`${item.field}${row.originalId}`}
                      align={item.align}
                    >
                      {item.format
                        ? item.format(row[item.field])
                        : row[item.field] ||
                          actions.map((action, index) => (
                            <div key={index.Menu} size="small">
                              {action.Menu(row.originalId)}
                            </div>
                          ))}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <TableRow>
          <TablePagination
            component="div"
            rowsPerPageOptions={rowsPerPageOptions}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
          />
        </TableRow>
      </TableFooter>
    </Paper>
  );
};

export default withLoaderAndMessage(GenericTable);
