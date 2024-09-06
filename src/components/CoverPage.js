import React from "react";
import { Box, Typography, Button } from "@mui/material";
import cover from "../images/cover.jpg";
import SearchBar from "./SearchBar";

function CoverPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          top: "120px",
          alignItems: "center",

          width: "100%",
        }}
      >
        <Box
          sx={{
            marginLeft: { xs: "25px" },
            marginRight: { xs: "25px" },
          }}
        >
          <Typography
            sx={{
              fontSize: "33px",
              fontWeight: "600",
              fontFamily: "roboto",
              lineHeight: "40px",
              color: "white",
              maxWidth: "630px",
              marginBottom: "20px",
            }}
          >
            The best free stock photos, royalty free images & videos shared by
            creators.
          </Typography>

          <SearchBar />
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "500px",
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "black",
            opacity: 0.3,
            width: "100%",
            height: "100%",
          }}
        ></Box>
        <img
          src={cover}
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            opacity: "1",
          }}
        />
      </Box>
    </Box>
  );
}

export default CoverPage;
