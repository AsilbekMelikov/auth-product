import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../interfaces/user-info";
import { ProductList } from "../../interfaces/product-list";

export interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null;
  productList: ProductList[];
  showProductForm: boolean;
  addProductLoading: boolean;
  addProduct: ProductList[];
  updateProductLoading: boolean;
  updateProduct: ProductList;
  deleteProduct: ProductList;
}

const initialState: AuthState = {
  loading: false,
  userInfo: {},
  productList: [],
  showProductForm: false,
  addProductLoading: false,
  addProduct: [],
  updateProductLoading: false,
  updateProduct: {} as ProductList,
  deleteProduct: {} as ProductList,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    request: (state) => {
      state.loading = true;
    },
    success: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.loading = false;
    },

    getProducts: (state, action: PayloadAction<ProductList[]>) => {
      state.productList = action.payload;
    },

    setShowProductForm: (state) => {
      state.showProductForm = !state.showProductForm;
    },

    addRequestProduct: (state) => {
      state.addProductLoading = true;
    },

    addProduct: (state, action: PayloadAction<ProductList>) => {
      state.addProduct.push(action.payload);
      state.addProductLoading = false;
    },

    updateRequestProduct: (state) => {
      state.updateProductLoading = true;
    },

    updateProduct: (state, action: PayloadAction<ProductList>) => {
      const updatedProductIndex = state.productList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.productList[updatedProductIndex] = action.payload;
      state.updateProductLoading = false;
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productList = state.productList.filter(
        (item) => item.id !== action.payload
      );
    },

    setLogOut: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      state.userInfo = null;
      window.location.pathname = "/auth/login";
    },
  },
});
export const {
  request,
  success,
  getProducts,
  setShowProductForm,
  addRequestProduct,
  addProduct,
  updateRequestProduct,
  updateProduct,
  deleteProduct,
  setLogOut,
} = userSlice.actions;
export default userSlice.reducer;
