import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchBox = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await axios.get("http://127.0.0.1:8000/search", {
        params: { query },
      });
      const results = response.data;

      if (results.length === 0) {
        setError("검색 결과가 없습니다.");
        return;
      }
      setError("");
      handleSearchSuccess(query, results); // 검색 성공 시 상위 컴포넌트에 알림
    } catch {
      setError("검색 결과를 가져오는 데 실패했습니다.");
    }
  };

  const handleSearchSuccess = (query, results) => {
    navigate(`/searchResults/${query}`,{state: {results}});
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Box>
      <TextField
        label="Search Products"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="small"
        style={{ width: "60%", maxWidth: "500px", marginBottom:"6%" }}
      />
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default SearchBox;
