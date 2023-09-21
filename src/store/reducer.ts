import { Action, ActionType } from "./actions";
import { IState } from "./interfaces";

export function reducer(state: IState, action: Action): IState {
  console.log({ state, action });
  switch (action.type) {
    case ActionType.SET_RATING: {
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          rating: action.payload,
        },
      };
    }
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
    case ActionType.SET_USER_REVIEW: {
      const property =
        action.type === ActionType.SET_COMPANIES ? "companies" : "userReview";
      return {
        ...state,
        [property]: action.payload,
      };
    }
    case ActionType.SET_COMPANY: {
      return {
        ...state,
        company: action.payload,
        latestReviews: [],
        userReview: null,
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
    case ActionType.SHOW_TOAST:
      return {
        ...state,
        toast: {
          show: true,
          message: action.payload,
        },
      };
    case ActionType.HIDE_TOAST:
      return {
        ...state,
        toast: {
          show: false,
          message: "",
        },
      };
    default:
      return state;
  }
}
