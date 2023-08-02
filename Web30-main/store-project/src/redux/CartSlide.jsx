import { createSlice } from "@reduxjs/toolkit";

const CartSlide = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // console.log(action);
      // console.log(state);

      const iteminCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (iteminCart) {
        iteminCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      // console.log(state.cart);
    },
    remove: (state, action) => {
      console.log(action);
      let cartitem = state.cart.filter((item) => item.id !== action.payload.id);
      state.cart = cartitem;
    },
    upQuantity: (state, action) => {
      console.log(action);
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
    },
    downQuantity: (state, action) => {
      console.log(action);
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity == 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});
export const { remove } = CartSlide.actions;

export const cartReducer = CartSlide.reducer;

export const { addToCart } = CartSlide.actions;

export const { upQuantity } = CartSlide.actions;

export const { downQuantity } = CartSlide.actions;
