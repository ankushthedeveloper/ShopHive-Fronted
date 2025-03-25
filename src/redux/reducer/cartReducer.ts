import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItemType, ShippingInfo } from "../../types/types";
import { cartReducerInitialState } from "../../types/reducer-types";

const initialState: cartReducerInitialState = {
  cartItems: [],
  loading: false,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone:""
  },
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
};
export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i:any) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else state.cartItems.push(action.payload);

      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i:any) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      let subtotal = 0;
      console.log(subtotal);

      state.cartItems.forEach((item:any) => {
        subtotal += item.price * item.quantity;
      });

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 200 : 0;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },

    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },

    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
