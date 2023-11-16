import { Colors, IState, Tags } from "./state.interface";

export const USER_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/reviews-app-9ff65.appspot.com/o/users%2Fanonymous-avatar-icon-25.jpg?alt=media&token=bd1f7e5b-b1bf-4411-b649-f3b542a0a005";

export const initialState: IState = {
  user: {
    email: localStorage.getItem("email") ?? "",
    url: localStorage.getItem("url") ?? USER_IMAGE,
    isAdmin: localStorage.getItem("isAdmin")==="true" ?? false
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
  products: [],
  product: null,
  productId: localStorage.getItem("productId") ?? null,
  latestReviews: [],
  userReview: null,
  toast: {
    message: "",
    show: false,
  },
  editedProduct: null,
  total: 0
};
