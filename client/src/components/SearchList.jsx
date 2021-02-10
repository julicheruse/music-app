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
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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
      .then((r) => setData(r.data))
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getPageData(newPage);
  };

  return (
    <List>
      {console.log(data) &&
        data.items.map((item) => (
          <ListItem key={item.id}>
            {/* <ListItemAvatar>
              <Avatar>
                <img src={item.images[0].url} />
              </Avatar>
            </ListItemAvatar>*/}
            <ListItemText primary={"item.name"} secondary={item.followers} />
            <Divider variant="inset" component="li" />
          </ListItem>
        ))}
      <Pagination
        style={{ padding: "15px" }}
        count={Math.ceil(data.total / 10)}
        variant="outlined"
        color="primary"
        showFirstButton
        showLastButton
        page={page}
        onChange={handleChangePage}
      />
    </List>
  );
}
