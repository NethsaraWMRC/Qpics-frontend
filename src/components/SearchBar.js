import React, { useState, useEffect, useRef } from "react";
import { Toolbar, InputBase, Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SSearch = styled("div")(({ theme }) => ({
  display: "flex",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  height: "45px",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40ch",
    },
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

const StyleToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
});

function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchBox, setSearchBox] = useState(false);
  const [imageData, setImageData] = useState([]);
  const searchBoxRef = useRef(null); // Ref for the search box container
  const navigation = useNavigate();

  const baseUrl = `http://localhost:3030`;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios
      .get(baseUrl + "/api/home")
      .then((res) => {
        setImageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      // Redirect to the search page with the query
      navigation(`/search/${query}`);
    }
  };

  // Close the search box when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchBox(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  return (
    <Box>
      <SSearch>
        <SearchIconWrapper>
          <Search sx={{ color: "#707070" }} />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setQuery(e.target.value);

            if (query.length > 1) {
              setSearchBox(true);
            } else {
              setSearchBox(false);
            }
          }}
          onKeyPress={handleKeyPress}
        />
      </SSearch>

      {/* search menu */}

      <Box
        ref={searchBoxRef} // Attach the ref here
        sx={{
          overflowY: "scroll",
          position: "absolute",
          boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
          backgroundColor: "white",
          color: "black",
          padding: "10px 0",
          width: "25%",
          maxHeight: "150px",
          display: searchBox ? "block" : "none",
          borderRadius: "5px",
        }}
      >
        {imageData
          .filter((name) => name.title.toLowerCase().includes(query))
          .slice(0, 8)
          .map((name) => (
            <Link to={`/search/${query}`} style={{ textDecoration: "none" }}>
              <Box
                key={name.imageUrl}
                sx={{
                  cursor: "pointer",
                  padding: "10px",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
                }}
              >
                <Typography sx={{ color: "black" }}>{name.title}</Typography>
              </Box>
            </Link>
          ))}
      </Box>
    </Box>
  );
}

export default SearchBar;
