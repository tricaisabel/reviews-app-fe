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
        reviewForm: {
          name: "",
          description: "",
          rating: -1,
          editMode: false,
          show: false,
        },
      };
    }
    case ActionType.SET_LATEST_REVIEWS: {
      return {
        ...state,
        latestReviews: action.payload,
      };
    }

    case ActionType.LOAD_DEFAULT_REVIEWS:
    case ActionType.LOAD_MORE_REVIEWS: {
      if (!state.company) return state;
      const newCount =
        action.type === ActionType.LOAD_DEFAULT_REVIEWS
          ? 3
          : state.company.end + 3;
      return {
        ...state,
        company: {
          ...state.company,
          end: newCount,
        },
      };
    }

    case ActionType.LOAD_ALL_REVIEWS: {
      if (!state.company) return state;
      return {
        ...state,
        company: {
          ...state.company,
          end: state.company.reviewCount,
        },
      };
    }

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
    case ActionType.SHOW_REVIEW_FORM:
      const newState = { ...state };
      newState.reviewForm.show = true;
      newState.reviewForm.editMode = action.payload.editMode;
      if (action.payload.editMode) {
        newState.reviewForm.rating = state.userReview?.rating ?? -1;
        newState.reviewForm.name = state.userReview?.name ?? "";
        newState.reviewForm.description = state.userReview?.description ?? "";
      }
      return newState;
    case ActionType.HIDE_REVIEW_FORM:
      return {
        ...state,
        reviewForm: {
          ...state.reviewForm,
          show: false,
          editMode: false,
        },
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
