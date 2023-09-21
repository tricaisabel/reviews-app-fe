import { Action, SET_EMAIL, SET_RATING, SET_URL } from "./action.type";

export interface State {
  email: string;
  url: string;
  rating: number;
}

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_URL:
      return { ...state, url: action.payload };
    case SET_RATING:
      return { ...state, rating: action.payload };
    default:
      return state;
  }
}
