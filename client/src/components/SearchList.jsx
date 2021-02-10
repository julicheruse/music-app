import React, { useEffect, useState } from "react";
import Pagination, { usePagination } from "@material-ui/lab/Pagination";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
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

  const [page, setPage] = React.useState(1);

  const getPageData = (pag) => {
    let offset = pag === 1 ? 0 : (pag - 1) * 10;
    axios(
      `http://localhost:8888/search?q=${props.searching}&type=artist&offset=${offset}`
    )
      .then((r) => setData(r.data.artists))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getPageData(newPage);
  };

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
      <div style={{ padding: "15px" }}>
        <Pagination
          count={Math.ceil(data.total / 10)}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </TableContainer>
  );
}
