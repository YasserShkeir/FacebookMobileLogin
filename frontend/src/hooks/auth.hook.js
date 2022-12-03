import axios from "axios";
import { LOCALIP } from "@env";

export const checkFbCredentials = async (facebookId) => {
  try {
    const response = await axios.post(
      `${LOCALIP}/auth/fbCredentialsValidation`,
      {
        facebookId,
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (facebookId, name, dateOfBirth, imageURL) => {
  try {
    const response = await axios.post(`${LOCALIP}/auth/register`, {
      facebookId,
      name,
      dateOfBirth,
      imageURL,
    });
    if (response.status === 201) {
      console.log("User created successfully");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
