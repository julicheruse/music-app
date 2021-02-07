import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function SearchList() {
  return <Pagination count={10} variant="outlined" color="primary" />;
}
