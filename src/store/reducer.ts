import { Action, ActionType } from "./actions";
import { IState } from "./interfaces";

export function reducer(state: IState, action: Action): IState {
  console.log({ state, action });
  switch (action.type) {
    case ActionType.SET_EMAIL:
    case ActionType.SET_URL:
    case ActionType.SET_RATING:
      return { ...state, [action.type]: action.payload };

    case ActionType.SET_LOGIN_FORM:
    case ActionType.SET_REVIEW_FORM: {
      const formType =
        action.type === ActionType.SET_LOGIN_FORM ? "loginForm" : "reviewForm";
      return {
        ...state,
        [formType]: {
          ...state[formType],
          [action.payload.name]: action.payload.value,
        },
      };
    }
    case ActionType.SET_COMPANIES:
    case ActionType.SET_COMPANY:
    case ActionType.SET_USER_REVIEW: {
      const property =
        action.type === ActionType.SET_COMPANIES
          ? "companies"
          : action.type === ActionType.SET_COMPANY
          ? "company"
          : "userReview";
      return {
        ...state,
        [property]: action.payload,
      };
    }
    case ActionType.SET_LATEST_REVIEWS: {
      return {
        ...state,
        latestReviews: action.payload,
      };
    }

    case ActionType.LOAD_DEFAULT_REVIEWS:
    case ActionType.LOAD_MORE_REVIEWS:
      return {
        ...state,
        company: {
          ...state.company,
          end:
            action.type === ActionType.LOAD_DEFAULT_REVIEWS
              ? 3
              : state.company.end + 3,
        },
      };

    case ActionType.LOAD_ALL_REVIEWS:
      return {
        ...state,
        company: {
          ...state.company,
          end: state.company.reviewCount,
        },
      };

    default:
      return state;
  }
}
