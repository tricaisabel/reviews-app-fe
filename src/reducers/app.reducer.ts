import { Action, ActionType } from "./action.type";

export interface State {
  email: string;
  url: string;
  rating: number;
  loginForm: {
    email: string;
    password: string;
  };
}

export const initialState: State = {
  email: localStorage.getItem("email") ?? "",
  url: localStorage.getItem("url") ?? "",
  rating: 0,
  loginForm: {
    email: "",
    password: "",
  },
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionType.SET_URL:
      return { ...state, url: action.payload };
    case ActionType.SET_RATING:
      return { ...state, rating: action.payload };
    case ActionType.SET_LOGIN_FORM:
      const loginForm = {
        ...state.loginForm,
        [action.payload.name]: action.payload.value,
      };

      return { ...state, loginForm };
    default:
      return state;
  }
}
