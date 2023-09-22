export interface ICompany {
  url: string;
  averageRating: number;
  reviewCount: number;
  name: string;
  _id: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IReviewForm {
  name: string;
  description: string;
  rating: number;
  editMode: boolean;
  show: boolean;
}

export interface IToast {
  message: string;
  show: boolean;
}

export interface IReview {
  _id: string;
  rating: number;
  description?: string;
  name: string;
  userUrl: string;
  createdAt: string;
}

export interface ICurrentUser {
  email: string;
  url: string;
}

export interface IState {
  user: ICurrentUser;
  loginForm: ILoginForm;
  reviewForm: IReviewForm;
  companies: ICompany[];
  companyId: string | null;
  company: ICompany | null;
  latestReviews: IReview[];
  userReview: IReview | null;
  toast: IToast;
}
