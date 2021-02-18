import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, CardMedia } from "@material-ui/core";

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

export default function About(props) {
  const { id } = useParams();
  const [about, setAbout] = useState("");

  useEffect(() => {
    getAbout(id);
  }, []);
  const getAbout = async (id) => {
    await axios
      .get(`http://localhost:8888/about/${id}`)
      .then((res) => {
        console.log(res);
        setAbout(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getAlbums = async (id) => {
    await axios
      .get(`http://localhost:8888/about/${id}`)
      .then((res) => {
        console.log(res);
        setAbout(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <StyledPaper elevation={3}>
      <CardMedia
        component="img"
        alt={`${about.name && about.name} Image`}
        height="140"
        //image={about.images[0].url}
        title={`${about.name && about.name} Image`}
      />
      <p>
        <Typography variant="h4">{about.name && about.name}</Typography>
      </p>
      <div>
        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </div>
    </StyledPaper>
  );
}
