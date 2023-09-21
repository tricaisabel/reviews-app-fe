import axios, { AxiosError, AxiosResponse } from "axios";
import { ICompany, IReview } from "../store/interfaces";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const getCompanies = async (
  setCompanies: (companies: ICompany[]) => void,
  navigate: (path: string) => void
) => {
  return API.get<ICompany[]>("/companies")
    .then((response: AxiosResponse) => {
      if (!response.data.error) {
        setCompanies(response.data);
      } else {
        navigate("/login");
      }
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

export const getCompany = async (
  companyId: string,
  setCompany: (company: ICompany) => void
) => {
  return API.get<ICompany>(`/companies/${companyId}`)
    .then((response: AxiosResponse) => {
      setCompany(response.data);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

export const getUserReview = async (
  companyId: string,
  setUserReview: (review: IReview) => void
) => {
  return API.get<IReview>(`companies/${companyId}/reviews/user`)
    .then((response: AxiosResponse) => {
      setUserReview(response.data.review);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};

export const getLatestReviews = async (
  companyId: string,
  end: number,
  setLatestReviews: (reviews: IReview[]) => void
) => {
  const param = end ?? 3;
  return API.get<IReview[]>(
    `companies/${companyId}/reviews/latest?end=${param}`
  )
    .then((response: AxiosResponse) => {
      setLatestReviews(response.data);
    })
    .catch((error: AxiosError) => {
      console.log(error);
    });
};
