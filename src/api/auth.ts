import { AxiosError, AxiosResponse } from "axios";
import { API } from "./company";

export const auth = async (requestBody: object, type: string) => {
  return API.post(`/auth/${type}`, requestBody)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};

export const logout = async () => {
  localStorage.removeItem("email");
  localStorage.removeItem("url");
  return API.post("/auth/logout")
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};
