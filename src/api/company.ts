import axios, { AxiosError, AxiosResponse } from "axios";
import { ICompany, IReview, IReviewForm } from "../store/interfaces";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const getCompanies = async () => {
  return API.get<ICompany[]>("/companies")
    .then((response: AxiosResponse) => {
      const { companies } = response.data;
      return companies ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getCompany = async (companyId: string) => {
  return API.get<ICompany>(`/companies/${companyId}`)
    .then((response: AxiosResponse) => {
      const { company } = response.data;
      return company ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getUserReview = async (companyId: string) => {
  return API.get<IReview>(`companies/${companyId}/reviews/user`)
    .then((response: AxiosResponse) => {
      const { review } = response.data;
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getLatestReviews = async (companyId: string, end: number) => {
  const param = end ?? 3;
  return API.get<IReview[]>(
    `companies/${companyId}/reviews/latest?end=${param}`
  )
    .then((response: AxiosResponse) => {
      const { reviews } = response.data;
      return reviews ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const postReviewToCompany = async (
  companyId: string,
  requestBody: IReviewForm,
  showToastMessage: (message: string) => void
) => {
  return API.post(`/companies/${companyId}/reviews`, requestBody)
    .then((response: AxiosResponse) => {
      const { review } = response?.data;
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};
