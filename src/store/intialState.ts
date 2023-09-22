import { IState } from "./interfaces";

export const initialState: IState = {
  user: {
    email: localStorage.getItem("email") ?? "",
    url: localStorage.getItem("url") ?? "",
  },
  loginForm: {
    email: "",
    password: "",
  },
  reviewForm: {
    name: "",
    description: "",
    rating: -1,
    editMode: false,
    show: false,
  },
  companies: [],
  company: null,
  latestReviews: [],
  userReview: null,
  toast: {
    message: "",
    show: false,
  },
  isLoading: false,
};
