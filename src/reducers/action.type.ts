export type Action =
  | { type: typeof SET_EMAIL; payload: string }
  | { type: typeof SET_URL; payload: string }
  | { type: typeof SET_RATING; payload: number };

export const SET_EMAIL = "SET_EMAIL";
export const SET_URL = "SET_URL";
export const SET_RATING = "SET_RATING";
