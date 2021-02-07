import React, { useState } from "react";
import "./search.css";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import axios from "axios";

export default function Search() {
  const [searching, setSearching] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearching(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searching", searching);
    axios(`http://localhost:8888/search?q=${searching}&type=artist`)
      .then((r) => setResult(r.data))
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("res", result, "ser", searching);
  return (
    <div className="container">
      <p>
        <Typography variant="h4">Spotify Search APP</Typography>
      </p>
      <form onSubmit={handleSubmit} className="searchField">
        <TextField
          id="searchInput"
          label="Search"
          size="small"
          fullWidth="true"
          margin="20px"
          onChange={handleChange}
        />
        <Button
          id="searchButton"
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          disabled={searching ? false : true}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
