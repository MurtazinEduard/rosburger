import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartSlice, IProductCart } from '../types';

const getItemsFromLocalStorage = () => {
  const data = localStorage.getItem('cart')
  const items: IProductCart[] = data ? JSON.parse(data) : []
  const totalPrice = items.reduce(
    (sum, obj) => obj.price * obj.count + sum,
    0,
  );
  return {
    itemsInCart: items,
    totalPrice,
  };
}

const initialState: ICartSlice = getItemsFromLocalStorage()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<IProductCart>) => {
      const isItemsInCart = state.itemsInCart.find(
        (obj) => obj._id === action.payload._id,
      );
      if (isItemsInCart) {
        isItemsInCart.count++;
      } else {
        state.itemsInCart.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.itemsInCart.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0,
      );
    },
    minusItemFromCart: (state, action: PayloadAction<string>) => {
      const isItemsInCart = state.itemsInCart.find(
        (obj) => obj._id === action.payload,
      );
      if (isItemsInCart && isItemsInCart.count < 2) {
        state.itemsInCart = state.itemsInCart.filter(
            (obj) => obj._id !== action.payload,
          );
      } else if (isItemsInCart) {
        isItemsInCart.count--;
      }
      state.totalPrice = state.itemsInCart.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0,
      );
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.itemsInCart = state.itemsInCart.filter(
        (obj) => obj._id !== action.payload,
      );
      state.totalPrice = state.itemsInCart.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0,
      );
    },
    clearCart: (state) => {
      state.itemsInCart = []
      state.totalPrice = state.itemsInCart.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0,
      );
    }
  },
});

export const { addItemToCart, minusItemFromCart,removeItemFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
