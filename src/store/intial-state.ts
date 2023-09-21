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
  },
  companies: [],
  company: {
    name: "",
    url: "",
    averageRating: 0,
    reviewCount: 0,
    end: 3,
    _id: "",
    rating: 0,
  },
  latestReviews: [],
  userReview: null,
};
