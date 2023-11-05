import axios, { AxiosError, AxiosResponse } from "axios";
import { IProduct, IReview, IReviewForm } from "../store/state.interface";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const getProducts = async (
  showToastMessage: (text: string) => void,
  navigate: (path: string) => void
) => {
  return API.get<IProduct[]>("/products")
    .then((response: AxiosResponse) => {
      const { products } = response.data;
      return products ?? [];
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
      navigate("/login");
    });
};

export const getProduct = async (
  productId: string,
  showToastMessage: (text: string) => void,
  navigate: (path: string) => void
) => {
  return API.get<IProduct>(`/products/${productId}`)
    .then((response: AxiosResponse) => {
      const { product } = response.data;
      return product ?? null;
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
      navigate("/login");
    });
};

export const getUserReview = async (productId: string) => {
  return API.get<IReview>(`products/${productId}/reviews/user`)
    .then((response: AxiosResponse) => {
      const { review } = response.data;
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getLatestReviews = async (productId: string, end: number) => {
  const param = end ?? 3;
  return API.get<IReview[]>(
    `products/${productId}/reviews/latest?end=${param}`
  )
    .then((response: AxiosResponse) => {
      const { reviews } = response.data;
      return reviews ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const postReviewToProduct = async (
  productId: string,
  requestBody: IReviewForm,
  showToastMessage: (message: string) => void
) => {
  return API.post(`/products/${productId}/reviews`, requestBody)
    .then((response: AxiosResponse) => {
      const { review } = response?.data;
      showToastMessage("Your review was added");
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};

export const updateReviewDescription = async (
  productId: string,
  reviewId: string,
  description: string,
  showToastMessage: (message: string) => void
) => {
  return API.patch(`/products/${productId}/reviews/${reviewId}`, {
    description,
  })
    .then((response: AxiosResponse) => {
      showToastMessage(response?.data as string);
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};
