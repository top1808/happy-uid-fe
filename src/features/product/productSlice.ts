import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/productType';

interface InitialState {
    error?: string;
    products: Product[];
}

const initialState: InitialState = {
    products: [],
    error: "",
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProductSuccess(state, action: PayloadAction<Product>) {
        state.products.push(action.payload);
        alert("Tạo sản phẩm thành công");
    },
    createProductError(state, action: PayloadAction<string>) {
        state.error = action.payload;
        alert("Tạo sản phẩm thất bại");
    }
  },
});

export const { createProductSuccess, createProductError } = productSlice.actions;

export const productReducer = productSlice.reducer;
