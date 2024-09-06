import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { Download, Favorite } from "@mui/icons-material";
import { useEffect } from "react";
import styled from "@emotion/styled";
import CoverPage from "../components/CoverPage";
// import { ImageData } from './ImagesData';
import LargeImage from "../components/LargeImage";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";

const CBox = styled(Box)({
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  transition: ".5s ease",
  height: "100%",
  width: "100%",
  opacity: "0",
  boxShadow:
    "inset 0px 15px 100px rgb(0, 0, 0, 0.5),inset 0px -15px 100px rgb(0, 0, 0,0.5)",
  "&:hover": {
    opacity: "1",
  },
});

function Home() {
  const [isView, setIsView] = useState(false);
  const [clickedUrl, setClickedUrl] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [favColors, setFavColors] = useState("");
  const [favClick, setFavClick] = useState("");

  const baseUrl = `http://localhost:3030`;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    axios
      .get(baseUrl + "/api/home")
      .then((res) => {
        setImageData(res.data);
        // console.log(imageData)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (imageUrl) => {
    setIsView(true);

    setClickedUrl(imageUrl);
  };

  const handleCloseImage = () => {
    setIsView(false);
    setClickedUrl(null);
  };

  const handleFavoriteClick = (imageUrl) => {
    // Toggle the favorite color for the clicked image

    setFavColors((prevFavColors) => {
      return {
        ...prevFavColors,
        [imageUrl]: prevFavColors[imageUrl] === "red" ? "white" : "red",
      };
    });
  };

  return (
    <Box>
      <CoverPage />
      <Container maxWidth="xl" sx={{ marginTop: "40px", maxWidth: "1400px" }}>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "Plus Jakarta Sans",
            marginBottom: "30px",
          }}
        >
          Free Stock Photos
        </Typography>

        <Box>
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            {imageData
              .slice()
              .reverse()
              .map((item) => (
                <Box
                  key={item.imageUrl}
                  sx={{
                    marginBottom: "10px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", gap: "2" }}>
                    <CBox>
                      <Favorite
                        onClick={() => {
                          handleFavoriteClick(item.imageUrl);
                        }}
                        sx={{
                          color: favColors[item.imageUrl] || "white",
                          position: "absolute",
                          right: "0",
                          fontSize: "30px",
                          margin: "10px 20px",
                          "&:hover": { opacity: "0.7" },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          color: "white",
                          position: "absolute",
                          bottom: "5px",
                          fontSize: "14px",
                        }}
                      >
                        <Typography
                          sx={{
                            marginLeft: "15px",
                            "&:hover": { opacity: "0.7" },
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Download
                          sx={{
                            fontSize: "35px",
                            marginRight: "15px",
                            "&:hover": { opacity: "0.7" },
                            color: "white",
                          }}
                        />
                      </Box>
                    </CBox>
                    <Box
                      onClick={() => {
                        handleClick(item.imageUrl);
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          objectFit: "cover",
                          display: "block",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
          </Masonry>
        </Box>

        {isView && clickedUrl && (
          <LargeImage imageUrl={clickedUrl} onClose={handleCloseImage} />
        )}
      </Container>
    </Box>
  );
}

export default Home;
