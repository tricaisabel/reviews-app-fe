export interface ICompany {
  url: string;
  averageRating: number;
  reviewCount: number;
  name: string;
  _id: string;
  end: number;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IReviewForm {
  name: string;
  description: string;
  rating: number;
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

export interface IState {
  email: string;
  url: string;
  loginForm: ILoginForm;
  reviewForm: IReviewForm;
  companies: ICompany[];
  company: ICompany;
  latestReviews: IReview[];
  userReview: IReview | null;
  toast: IToast;
}
