import axios from "axios";
import { LOCALIP } from "@env";

export const getSelf = async (facebookId) => {
  try {
    const response = await axios.post(`${LOCALIP}/user/self`, {
      facebookId,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
