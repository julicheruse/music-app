import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { capitalize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    color: "white",
  },
  text: {
    paddingLeft: 10,
  },
}));

export default function SearchTrackList(props) {
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
    setPage(newPage);
    getPageData(newPage);
  };

  return (
    <List>
      {array &&
        array.map((item) => (
          <div>
            <ListItem
              button
              component={Link}
              to={`/track/${item.id}`}
              key={item && item.id}
              dense
              className={classes.cont}
            >
              <ListItemAvatar>
                <Avatar className={classes.large}>
                  {item.artists
                    ? item.artists[0].name.charAt(0).toUpperCase()
                    : null}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                className={classes.text}
                primary={item.name ? capitalize(item.name) : "N/A"}
                secondary={`Artists:${
                  item.artists
                    ? item.artists.map((a) => " " + capitalize(a.name))
                    : null
                }`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      {array ? (
        <Pagination
          style={{
            padding: "15px",
            display: "flex",
            justifyContent: "center",
          }}
          count={Math.ceil(datos.total / 10)}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
          page={page}
          onChange={handleChangePage}
          className={classes.Pagination}
        />
      ) : null}
    </List>
  );
}
