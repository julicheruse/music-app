import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Search from "./Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  text: {
    paddingLeft: 10,
  },
  cont: {
    hover: "true",
  },
}));

export default function SearchList(props) {
  const [datos, setDatos] = useState(props.data);
  const [array, setArray] = useState(props.data.items);
  console.log("d", datos);
  const classes = useStyles();
  useEffect(() => {
    setArray(props.data.items);
    setDatos(props.data);
  }, [props, Search]);

  const [page, setPage] = React.useState(1);

  const getPageData = async (pag) => {
    let offset = pag === 1 ? 0 : (pag - 1) * 10;
    console.log("o", offset, props.searching);
    await axios
      .get(
        `http://localhost:8888/search?q=${props.searching}&type=artist&offset=${offset}`
      )
      .then((res) => {
        setArray(res.data.artists.items);
        setDatos(res.data.artists);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    console.log("new", newPage);
    setPage(newPage);
    getPageData(newPage);
  };
  console.log(array);
  return (
    <List>
      {array &&
        array.map((item) => (
          <div>
            <ListItem
              key={item && item.id}
              dense
              button
              className={classes.cont}
            >
              <ListItemAvatar>
                <Avatar
                  src={item.images[0] && item.images[0].url}
                  className={classes.large}
                ></Avatar>
              </ListItemAvatar>

              <ListItemText
                className={classes.text}
                primary={item.name ? item.name : "N/A"}
                secondary={
                  item.followers.total
                    ? "Followers: " + item.followers.total
                    : "N/A"
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      {array ? (
        <Pagination
          style={{ padding: "15px" }}
          count={Math.ceil(datos.total / 10)}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
        />
      ) : null}
    </List>
  );
}
