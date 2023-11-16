import { IProduct, IReview } from "./state.interface";

export type Action =
  | {
      type:
        | typeof ActionType.SET_LOGIN_FORM
        | typeof ActionType.SET_REVIEW_FORM;
      payload: {
        name: string;
        value: string | number;
      };
    }
  | {
      type: typeof ActionType.SET_RATING;
      payload: number;
    }
  | {
      type: typeof ActionType.SET_COMPANIES;
      payload: IProduct[];
    }
  | {
      type: typeof ActionType.SET_COMPANY_DATA;
      payload: IProduct | null;
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
    type: typeof ActionType.SET_IS_ADMIN;
    payload: boolean;
  }
  |
  {
    type: typeof ActionType.SET_EDIT_PRODUCT;
    payload: {
      product: IProduct | null
    }
  }
  |
  {
    type: typeof ActionType.DELETE_PRODUCT;
    payload: {
      productId: string
    }
  }
  |
  {
    type: typeof ActionType.SET_TOTAL;
    total: number
  }
  | {
      type:
        | typeof ActionType.SET_USER_REVIEW_DESCRIPTION
        | typeof ActionType.SHOW_TOAST
        | typeof ActionType.SET_EMAIL
        | typeof ActionType.SET_URL
        | typeof ActionType.CHANGE_COMPANY;
      payload: string;
    }
  | {
      type: typeof ActionType.SHOW_REVIEW_FORM;
      payload: {
        editMode: boolean;
      };
    }
  | {
      type: typeof ActionType.HIDE_REVIEW_FORM | typeof ActionType.HIDE_TOAST;
    };

export enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_URL = "SET_URL",
  SET_IS_ADMIN="SET_IS_ADMIN",
  SET_RATING = "SET_RATING",
  SET_LOGIN_FORM = "SET_LOGIN_FORM",
  SET_REVIEW_FORM = "SET_REVIEW_FORM",
  SET_COMPANIES = "SET_COMPANIES",
  CHANGE_COMPANY = "CHANGE_COMPANY",
  SET_COMPANY_DATA = "SET_COMPANY_DATA",
  SET_LATEST_REVIEWS = "SET_LATEST_REVIEWS",
  SET_USER_REVIEW = "SET_USER_REVIEW",
  SET_USER_REVIEW_DESCRIPTION = "SET_USER_REVIEW_DESCRIPTION",
  SHOW_TOAST = "SHOW_TOAST",
  HIDE_TOAST = "HIDE_TOAST",
  SHOW_REVIEW_FORM = "SHOW_REVIEW_FORM",
  HIDE_REVIEW_FORM = "HIDE_REVIEW_FORM",
  SET_EDIT_PRODUCT="SET_EDIT_PRODUCT",
  DELETE_PRODUCT="DELETE_PRODUCT",
  SET_TOTAL="SET_TOTAL"
}

