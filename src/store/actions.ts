import { ICompany, IReview } from "./interfaces";

export type Action =
  | {
      type: typeof ActionType.SET_EMAIL | typeof ActionType.SET_URL;
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
      type: typeof ActionType.SET_COMPANY;
      payload: ICompany;
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
      type:
        | typeof ActionType.LOAD_DEFAULT_REVIEWS
        | typeof ActionType.LOAD_ALL_REVIEWS
        | typeof ActionType.LOAD_MORE_REVIEWS;
    };

export enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_URL = "SET_URL",
  SET_RATING = "SET_RATING",
  SET_LOGIN_FORM = "SET_LOGIN_FORM",
  SET_REVIEW_FORM = "SET_REVIEW_FORM",
  SET_COMPANIES = "SET_COMPANIES",
  SET_COMPANY = "SET_COMPANY",
  SET_LATEST_REVIEWS = "SET_LATEST_REVIEWS",
  SET_USER_REVIEW = "SET_USER_REVIEW",
  LOAD_MORE_REVIEWS = "LOAD_MORE_REVIEWS",
  LOAD_DEFAULT_REVIEWS = "LOAD_DEFAULT_REVIEWS",
  LOAD_ALL_REVIEWS = "LOAD_ALL_REVIEWS",
}
