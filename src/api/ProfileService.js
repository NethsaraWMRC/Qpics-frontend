import axios from "axios";

const baseUrl = "http://localhost:3030/api";

export const updateProPic = async (proPic) => {
  try {
    const response = await axios.put(
      baseUrl + "/update-profile-image",
      { proPic },
      {
        headers: { "auth-token": localStorage.getItem("token") },
      }
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error("Error during request setup");
  }
};

export const fetchProPic = async () => {
  try {
    const response = await axios.get(
      baseUrl + "/fetch-profile-image",

      {
        headers: { "auth-token": localStorage.getItem("token") },
      }
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Error("Error during request setup");
  }
};
