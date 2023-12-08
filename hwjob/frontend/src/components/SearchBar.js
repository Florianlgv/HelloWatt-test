import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput) {
      navigate(`consumption/${searchInput}`);
    }
  };
  return (
    <>
      <TextField
        fullWidth
        placeholder="Search for a client by id or name"
        variant="outlined"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#aaa" }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
