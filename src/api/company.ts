import axios, { AxiosError, AxiosResponse } from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const getCompanies = async () => {
  return API.get("/companies")
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};

export const getCompanyStats = async (companyId: string) => {
  return API.get(`/companies/${companyId}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};

export const getUserReview = async (companyId: string) => {
  return API.get(`companies/${companyId}/reviews/user`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};

export const getLatestReviews = async (companyId: string, end: number) => {
  return API.get(`companies/${companyId}/reviews/latest?end=${end}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return error.response?.data;
      }
    });
};
