import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, CardMedia } from "@material-ui/core";
import capitalize, { toMinsAndSecs } from "./utils";

const StyledPaper = withStyles({
  root: {
    background: "#212121",
    borderRadius: 3,
    border: 0,
    color: "white",
    //height: 48,
    padding: "30px",
    boxShadow: "0 3px 5px 2px #212121",
  },
})(Paper);

const useStyles = makeStyles((theme) => ({
  text: {
    paddingLeft: 10,
  },
}));

export default function Track(props) {
  const { id } = useParams();
  const [track, setTrack] = useState("");
  const classes = useStyles();
  useEffect(() => {
    getTrack(id);
  }, []);
  const getTrack = async (id) => {
    await axios
      .get(`http://localhost:8888/track/${id}`)
      .then((res) => {
        console.log(res);
        setTrack(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  console.log("t", track);
  return (
    <StyledPaper elevation={3}>
      <CardMedia
        component="img"
        alt={`${track.name && track.name} Image`}
        image={track ? track.album.images[0].url : null}
        title={`${track.name && track.name} Image`}
        height="200px"
      />
      <p>
        <Typography variant="h4">{track.name && track.name}</Typography>
        <Typography variant="h5">
          {`Artists:${
            track.artists
              ? track.artists.map((a) => " " + capitalize(a.name))
              : null
          }`}
        </Typography>
        <Typography variant="h5" className={classes.texto}>
          {track.album && "Album: " + track.album.name}
        </Typography>
      </p>
      <div>
        <Typography variant="body2" color="#b3b3b3" component="p">
          {`Duration: ${track.duration_ms && toMinsAndSecs(track.duration_ms)}`}
        </Typography>
        <Typography variant="body2" color="white" component="p">
          {`Released: ${track ? track.album.release_date : null}`}
        </Typography>
      </div>
    </StyledPaper>
  );
}
