import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  ImageList,
  ImageListItem,
  Grid,
  ListSubheader,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { Download, Favorite } from "@mui/icons-material";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
// import { ImageData } from './ImagesData';
import { useParams } from "react-router-dom";
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
  boxShadow: "inset 0px -50px 100px 0px rgb(0, 0, 0)",
  "&:hover": {
    opacity: "1",
  },
});

function FilteredItems() {
  const { topic } = useParams();
  const lTopic = topic.toLowerCase();
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isView, setIsView] = useState(false);
  const [clickedUrl, setClickedUrl] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [favColors, setFavColors] = useState("");

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

  const handleMouseEnter = (imageUrl) => {
    setHoveredImage(imageUrl); // Set the hovered image URL
  };

  const handleMouseLeave = () => {
    setHoveredImage(null); // Reset the hovered image when the mouse leaves
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: "60px" }}>
      <Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          {topic} Images
        </Typography>
      </Box>

      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {imageData
          .filter(
            (name) =>
              name.title.toLowerCase().includes(lTopic) ||
              name.tag1.toLowerCase().includes(lTopic)
          )
          .map((item) => (
            <Box
              key={item.imageUrl}
              onMouseEnter={() => handleMouseEnter(item.imageUrl)}
              onMouseLeave={handleMouseLeave}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {/* main cover box */}
              <Box sx={{ position: "relative", gap: "2" }}>
                {hoveredImage === item.imageUrl && (
                  <Favorite
                    onClick={() => handleFavoriteClick(item.imageUrl)}
                    sx={{
                      color: favColors[item.imageUrl] || "white",
                      position: "absolute",
                      right: "0",
                      fontSize: "30px",
                      margin: "10px 20px",
                      "&:hover": { opacity: "0.7" },
                      zIndex: 10,
                    }}
                  />
                )}

                {hoveredImage === item.imageUrl && (
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
                      zIndex: 10,
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
                )}

                <Box
                  onClick={() => {
                    handleClick(item.imageUrl);
                  }}
                >
                  {hoveredImage === item.imageUrl && (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",

                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
                        zIndex: 1,
                      }}
                    ></Box>
                  )}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      display: "block",
                      width: "100%",
                      position: "relative",
                      zIndex: 0,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
      </Masonry>

      {isView && clickedUrl && (
        <LargeImage imageUrl={clickedUrl} onClose={handleCloseImage} />
      )}
    </Container>
  );
}

export default FilteredItems;
