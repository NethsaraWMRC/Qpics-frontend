export const downloadImage = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);

    // Check if the response is OK and contains an image
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();

    // Check the MIME type to ensure it's an image
    if (!blob.type.startsWith("image/")) {
      throw new Error("The fetched file is not an image");
    }

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = imageUrl.split("/").pop(); // Use the image filename

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};
