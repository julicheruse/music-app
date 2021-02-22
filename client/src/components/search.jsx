import React, { useEffect, useState } from "react";
import "./Search.css";
import TextField from "@material-ui/core/TextField";
import { Typography, Button } from "@material-ui/core";
import axios from "axios";
import SearchArtistList from "./SearchArtistList";
import SearchTrackList from "./SearchTrackList";

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
    axios(`http://localhost:8888/search?q=${searching}&type=track&offset=0`)
      .then((r) => setResult(r.data))
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
        {result ? (
          result.artists ? (
            <SearchArtistList data={result.artists} searching={searching} />
          ) : result.tracks ? (
            <SearchTrackList data={result.tracks} searching={searching} />
          ) : null
        ) : null}
      </div>
    </div>
  );
}
