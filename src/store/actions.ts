import { ICompany, IReview } from "./interfaces";

export type Action =
  | {
      type:
        | typeof ActionType.SET_EMAIL
        | typeof ActionType.SET_URL
        | typeof ActionType.CHANGE_COMPANY;
      payload: string;
    }
  | {
      type:
        | typeof ActionType.SET_LOGIN_FORM
        | typeof ActionType.SET_REVIEW_FORM;
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: typeof ActionType.SET_RATING;
      payload: number;
    }
  | {
      type: typeof ActionType.SET_COMPANIES;
      payload: ICompany[];
    }
  | {
      type: typeof ActionType.SET_COMPANY_DATA;
      payload: ICompany | null;
    }
  | {
      type: typeof ActionType.SET_LATEST_REVIEWS;
      payload: IReview[];
    }
  | {
      type: typeof ActionType.SET_USER_REVIEW;
      payload: IReview;
    }
  | {
      type: typeof ActionType.SHOW_TOAST | typeof ActionType.HIDE_TOAST;
      payload: string;
    }
  | {
      type: typeof ActionType.SHOW_REVIEW_FORM;
      payload: {
        editMode: boolean;
      };
    }
  | {
      type: typeof ActionType.HIDE_REVIEW_FORM;
    };

export enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_URL = "SET_URL",
  SET_RATING = "SET_RATING",
  SET_LOGIN_FORM = "SET_LOGIN_FORM",
  SET_REVIEW_FORM = "SET_REVIEW_FORM",
  SET_COMPANIES = "SET_COMPANIES",
  CHANGE_COMPANY = "CHANGE_COMPANY",
  SET_COMPANY_DATA = "SET_COMPANY_DATA",
  SET_LATEST_REVIEWS = "SET_LATEST_REVIEWS",
  SET_USER_REVIEW = "SET_USER_REVIEW",
  SHOW_TOAST = "SHOW_TOAST",
  HIDE_TOAST = "HIDE_TOAST",
  SHOW_REVIEW_FORM = "SHOW_REVIEW_FORM",
  HIDE_REVIEW_FORM = "HIDE_REVIEW_FORM",
}
