import axios from "axios";
import { BASE_URL } from "./serviceBase";
import { User } from "../classes/User";

export type tokenResponseType = {
  user: User,
  expires_in: number,
  token: string
}



export const signInToken = async (username: string, password: string): Promise<{ user: User, token: string }> => {
    try {
        axios.defaults.withCredentials = true; // Allow using cookies
        const response = await axios.post(BASE_URL + "/auth/login", {
            username: username,
            password: password
        });

        return response.data; // Ensure that response.data contains { user, token }
    } catch (error: unknown) {
        console.log(error);
        throw error; // Propagate the error
    }
};


export const refreshToken = async (): Promise<tokenResponseType> => {
  try {
    axios.defaults.withCredentials = true; // Allowed to use cookies
    const response = await axios.post(BASE_URL + "/auth/refresh-token");

    return response.data
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

export const clearTokens = async () => {
  try {
    axios.defaults.withCredentials = true;
    await axios.post(BASE_URL + "/auth/clear-token");   
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}

export const registerUser = async (username: string, password: string): Promise<void> => {
  try {
      const response = await axios.post(BASE_URL + "/auth/register", {
          username,
          password,
      });
      return response.data; // Ensure your backend returns necessary data
  } catch (error) {
      console.log(error);
      throw error;
  }
};