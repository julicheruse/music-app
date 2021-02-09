import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Search from "./Search";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#212121",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function SearchList(props) {
  const [data, setData] = useState(props.data);
  const classes = useStyles();
  useEffect(() => {
    setData(props.data);
  }, [props]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Artist</StyledTableCell>
            <StyledTableCell align="left">Followers</StyledTableCell>
            <StyledTableCell align="left">Genres</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (console.log("data en tabla", data),
            data &&
              data.items.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.followers.total}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.genres.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              )))
          }
        </TableBody>
      </Table>
      <Pagination count={data.total} variant="outlined" color="primary" />;
    </TableContainer>
  );
}
