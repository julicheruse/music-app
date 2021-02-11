import React, { useEffect, useState } from "react";
import "./Search.css";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import axios from "axios";
import SearchList from "./SearchList";

export default function Search() {
  const [searching, setSearching] = useState([]);
  const [result, setResult] = useState([]);

  //useEffect(() => {}, [result]);

  const handleChange = (e) => {
    setSearching(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setResult([]);
    console.log("searching", searching);
    axios(`http://localhost:8888/search?q=${searching}&type=artist&offset=0`)
      .then((r) => setResult(r.data.artists))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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
      <div>
        {result ? <SearchList data={result} searching={searching} /> : null}
      </div>
    </div>
  );
}
