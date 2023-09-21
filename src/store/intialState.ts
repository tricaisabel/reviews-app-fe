import { IState } from "./interfaces";

export const initialState: IState = {
  email: localStorage.getItem("email") ?? "",
  url: localStorage.getItem("url") ?? "",
  loginForm: {
    email: "",
    password: "",
  },
  reviewForm: {
    name: "",
    description: "",
    rating: -1,
  },
  companies: [],
  company: {
    name: "",
    url: "",
    averageRating: 0,
    reviewCount: 0,
    end: 3,
    _id: "",
  },
  latestReviews: [],
  userReview: null,
  toast: {
    message: "",
    show: false,
  },
};
