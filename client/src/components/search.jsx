import React from "react";
import "./search.css";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

export default function Search() {
  return (
    <div className="container">
      <p>
        <Typography variant="h4">Spotify Search APP</Typography>
      </p>
      <TextField id="standard-basic" label="Search" size="small" />
    </div>
  );
}
