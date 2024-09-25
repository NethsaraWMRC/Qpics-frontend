import { Box, Button } from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import React, { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

function CropImage({ propic, changeImage, changeDisplay }) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const [proPic, setProPic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [proPicUrl, setProPicUrl] = useState("");

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      1,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCrop = () => {
    if (completedCrop && imgRef.current) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      // Draw the cropped image onto the canvas
      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      // Convert the canvas content to a Blob and create an Object URL
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const croppedImageUrl = URL.createObjectURL(blob);
        setSelectedImage(croppedImageUrl);
        firebaseUpload(blob); // You can use this URL to preview/download the cropped image
      }, "image/jpeg");

      changeDisplay("block");
      changeImage(null);
    }
  };

  //image uploading function
  const firebaseUpload = async (blob) => {
    try {
      if (selectedImage) {
        const proPicRef = ref(storage, `user/profile/${v4()}`);

        await uploadBytes(proPicRef, blob);

        const newProPicUrl = await getDownloadURL(proPicRef);
        setProPicUrl(newProPicUrl);
        console.log(newProPicUrl);
        return newProPicUrl; // Return the URL
      } else {
        console.error("Profile picture is not selected");
        return null;
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          alignItems: "center",
        }}
      >
        <ReactCrop
          crop={crop}
          onChange={(px, per) => setCrop(per)}
          onComplete={(c) => setCompletedCrop(c)}
          circularCrop
          keepSelection
          aspect={1}
          minWidth={150}
        >
          <img
            src={propic}
            alt="Profile"
            onLoad={onImageLoad}
            ref={imgRef} // Reference to the image element
          />
        </ReactCrop>

        {/* Add a "Crop" button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCrop}
          sx={{ marginTop: 2 }}
        >
          Crop
        </Button>
      </Box>
    </Box>
  );
}

export default CropImage;
