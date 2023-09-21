import { AxiosError, AxiosResponse } from "axios";
import { API } from "./company";

export const auth = async (
  requestBody: object,
  type: string,
  setUrl: (email: string) => void,
  setEmail: (email: string) => void,
  navigate: (url: string) => void,
  showToastMessage: (message: string) => void
) => {
  return API.post(`/auth/${type}`, requestBody)
    .then((response: AxiosResponse) => {
      const { email, url } = response.data;
      if (email && url) {
        setEmail(email);
        setUrl(url);
        localStorage.setItem("email", email);
        localStorage.setItem("url", url);
        navigate("/companies");
      }
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
      console.log(error.response?.data);
    });
};

export const logout = async () => {
  localStorage.removeItem("email");
  localStorage.removeItem("url");
  return API.post("/auth/logout")
    .then((response: AxiosResponse) => {
      console.log(response.data);
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};
