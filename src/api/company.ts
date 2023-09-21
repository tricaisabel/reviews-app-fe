import axios, { AxiosError, AxiosResponse } from "axios";
import { ICompany, IReview, IReviewForm } from "../store/interfaces";

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
      const { companies } = response.data;
      console.log(companies);
      if (companies) {
        setCompanies(companies);
      } else {
        navigate("/login");
      }
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
      navigate("/login");
    });
};

export const getCompany = async (
  companyId: string,
  setCompany: (company: ICompany) => void
) => {
  return API.get<ICompany>(`/companies/${companyId}`)
    .then((response: AxiosResponse) => {
      const { company } = response.data;
      if (company) setCompany(company);
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getUserReview = async (
  companyId: string,
  setUserReview: (review: IReview) => void
) => {
  return API.get<IReview>(`companies/${companyId}/reviews/user`)
    .then((response: AxiosResponse) => {
      const { review } = response.data;
      if (review) setUserReview(review);
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
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
      const { reviews } = response.data;
      console.log(reviews);
      if (reviews) setLatestReviews(reviews);
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
      showToastMessage(response.data);
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
      console.log(error.response?.data);
    });
};
