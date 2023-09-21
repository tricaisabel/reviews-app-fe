export type Action =
  | { type: typeof ActionType.SET_EMAIL; payload: string }
  | { type: typeof ActionType.SET_URL; payload: string }
  | {
      type: typeof ActionType.SET_LOGIN_FORM;
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: typeof ActionType.SET_RATING;
      payload: number;
    };

export enum ActionType {
  SET_EMAIL = "SET_EMAIL",
  SET_URL = "SET_URL",
  SET_RATING = "SET_RATING",
  SET_LOGIN_FORM = "SET_LOGIN_FORM",
}
