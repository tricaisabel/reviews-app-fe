import axios, { AxiosError, AxiosResponse } from "axios";
import { ICartItem, IProduct, IReview, IReviewForm, ProductForm } from "../store/state.interface";

export const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const getProducts = async (
  showToastMessage: (text: string) => void,
  navigate: (path: string) => void
) => {
  return API.get<IProduct[]>("/products")
    .then((response: AxiosResponse) => {
      const { products } = response.data;
      return products ?? [];
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
      navigate("/login");
    });
};

export const getProduct = async (
  productId: string,
  showToastMessage: (text: string) => void,
) => {
  return API.get<IProduct>(`/products/${productId}`)
    .then((response: AxiosResponse) => {
      const { product } = response.data;
      return product ?? null;
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};

export const getUserReview = async (productId: string) => {
  return API.get<IReview>(`products/${productId}/reviews/user`)
    .then((response: AxiosResponse) => {
      const { review } = response.data;
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const getLatestReviews = async (productId: string, end: number) => {
  const param = end ?? 3;
  return API.get<IReview[]>(
    `products/${productId}/reviews/latest?end=${param}`
  )
    .then((response: AxiosResponse) => {
      const { reviews } = response.data;
      return reviews ?? null;
    })
    .catch((error: AxiosError) => {
      console.log(error.response?.data);
    });
};

export const postReviewToProduct = async (
  productId: string,
  requestBody: IReviewForm,
  showToastMessage: (message: string) => void
) => {
  return API.post(`/products/${productId}/reviews`, requestBody)
    .then((response: AxiosResponse) => {
      const { review } = response?.data;
      showToastMessage("Your review was added");
      return review ?? null;
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};

export const updateReviewDescription = async (
  productId: string,
  reviewId: string,
  description: string,
  showToastMessage: (message: string) => void
) => {
  return API.patch(`/products/${productId}/reviews/${reviewId}`, {
    description,
  })
    .then((response: AxiosResponse) => {
      showToastMessage(response?.data as string);
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
};

export const addProductToCart = async (
  productId: string | undefined,
  quantity: number,
  size: string,
  showToastMessage: (message: string) => void
)=>{
  if(!productId){
    return;
  }
  return API.post(`auth/cart`, {productId, quantity, size})
    .then(() => {
      showToastMessage("Your product was added to the shopping cart");
    })
    .catch((error: AxiosError) => {
      showToastMessage(error.response?.data as string);
    });
}

export const getCartProducts = async ()=>{
  return API.get<{cartItems:ICartItem[]}>(`auth/cart`)
    .then((response: AxiosResponse) => {
      const {cartItems}=response.data;
      return cartItems ?? null;
    })
    .catch((error: AxiosError) => {
    });
}

export const removeProductFromCart = async (itemId: string) =>{
  return API.delete(`auth/cart/${itemId}`)
  .then((response: AxiosResponse) => {
  })
  .catch((error: AxiosError) => {
  });
}

export const addProduct = async (productForm: ProductForm)=>{
  const formData = new FormData();
  productForm.file && formData.append('file', productForm.file);
  formData.append('name',productForm.name);
  formData.append('price',productForm.price.toString());
  formData.append('composition', productForm.composition);

  return API.post(`products`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response: AxiosResponse) => {
    return response.data.product;
  })
  .catch((error: AxiosError) => {
  });
}

export const editProduct = async (productForm: ProductForm, productId: string)=>{
  const formData = new FormData();
  productForm.file && formData.append('file', productForm.file);
  formData.append('name',productForm.name);
  formData.append('price',productForm.price.toString());
  formData.append('composition', productForm.composition);

  return API.patch(`products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response: AxiosResponse) => {
    return response.data.product;
  })
  .catch((error: AxiosError) => {
  });
}

export const deleteProduct = async (productId: string)=>{
  return API.delete(`products/${productId}`)
  .then((response: AxiosResponse) => {
  })
  .catch((error: AxiosError) => {
  });
}
