import React from "react";
import { useState, useEffect } from "react";
import { Typography, Box, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link, useNavigate } from "react-router-dom";
import UploadSub from "./UploadSub";
import axios from "axios";

const UploadBox = styled(Box)({
  width: "100%",
  border: "3px dashed rgba(0,0,0,0.2)",
  borderRadius: "30px",
  textAlign: "center",
  alignItems: "center",
  padding: "60px 0",
});

function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [displayType, setDisplayType] = useState("block");
  const nav = useNavigate();

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
      setDisplayType("none");
    }
  }, [selectedImage]);

  return (
    <Container maxWidth="lg" sx={{ maxWidth: "1400px", marginTop: "100px" }}>
      <UploadBox sx={{ display: displayType }}>
        <AddPhotoAlternateIcon
          sx={{
            fontSize: { xs: "130px", md: "170px", lg: "200px" },
            color: "rgb(5, 160, 129)",
          }}
        />
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            fontFamily: "Plus Jakarta Sans",
          }}
        >
          Upload Your Images,
          <br />
          here
        </Typography>

        <Box>
          <Button
            sx={{
              padding: "20px 0",
              cursor: "pointer",
              backgroundColor: "rgb(5, 160, 129)",
              width: { xs: "20%", sm: "16%", md: "12%" },
              height: "40px",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "rgb(5, 160, 129)",
                opacity: "0.8",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "18px", md: "20px" },
                fontWeight: "600",
                fontFamily: "Plus Jakarta Sans",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Browse
            </Typography>
            <input
              accept="image/*"
              type="file"
              id="inputfile"
              name="inputfile"
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
              style={{
                position: "absolute",
                fontSize: "0",
                overflow: "hidden",
                width: "100%",
                height: "100%",
                opacity: "0",
                cursor: "pointer",
              }}
            />
          </Button>
        </Box>
      </UploadBox>

      {imageUrl && selectedImage && (
        <UploadSub path={imageUrl} file={selectedImage} />
      )}
    </Container>
  );
}

export default Upload;
