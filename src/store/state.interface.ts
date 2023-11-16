export interface IProduct {
  url: string;
  averageRating: number;
  reviewCount: number;
  name: string;
  _id: string;
  discount: number;
  price: number;
  tags: string[];
  color: string;
  composition: string;
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
  isAdmin: boolean;
}

export interface IState {
  user: ICurrentUser;
  loginForm: ILoginForm;
  reviewForm: IReviewForm;
  products: IProduct[];
  productId: string | null;
  product: IProduct | null;
  latestReviews: IReview[];
  userReview: IReview | null;
  toast: IToast;
  editedProduct: IProduct | null;
  total: number
}

export interface ICartItem {
  productImage: string;
  productName: string;
  productPrice: number;
  quantity: number;
  size: string;
  _id: string;
}

export enum Tags {
  TOPS="Tops", 
  SWEATERS="Sweaters", 
  DRESSES="Dresses", 
  VESTS="Vests", 
  BIKINIS="Bikinis", 
  HATS="Hats", 
  SCARVES="Scarves", 
  GLOVES="Gloves", 
  BEANIES="Beanies", 
  WINTER_COLLECTION="Winter Collection", 
  SUMMER_COLLECTION="Summer Collection", 
  SPRING_COLLECTION="Spring Collection", 
  AUTUMN_COLLECTION="Autumn Collection"
}

export enum Colors {
  RED = 'Red',
  GREEN = 'Green',
  BLUE = 'Blue',
  YELLOW = 'Yellow',
  ORANGE = 'Orange',
  PURPLE = 'Purple',
  PINK = 'Pink',
  BROWN = 'Brown',
  GRAY = 'Gray',
  BLACK = 'Black',
  WHITE = 'White',
  TEAL = 'Teal',
  CYAN = 'Cyan',
  MAGENTA = 'Magenta',
  LIME = 'Lime',
};
export interface ProductForm {
  name: string;
  file?: File;
  price: number;
  tags?: Tags;
  color?: Colors;
  discount?: number;
  composition: string;
}