import { createSlice } from '@reduxjs/toolkit';

const getInitialStateFromLocalStorage = () => {
  const initialStateFromStorage = localStorage.getItem('cart');
  return initialStateFromStorage ? JSON.parse(initialStateFromStorage) : [];
};

const initialState = {
  dishes: getInitialStateFromLocalStorage(),
  coupon: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return { dishes: [...state.dishes, { ...action.payload, amount: 1 }] };
    },
    clearCart: (state) => {
      return { dishes: [] };
    },
    removeFromCart: (state, action) => {
      return {
        dishes: state.dishes.filter((dish) => dish.id !== action.payload.id),
      };
    },
    incrementDishesAmount: (state, action) => {
      return {
        dishes: state.dishes.map((dish) =>
          dish.id === action.payload.id
            ? { ...dish, amount: dish.amount + 1 }
            : dish
        ),
      };
    },
    decrementDishesAmount: (state, action) => {
      return {
        dishes: state.dishes.map((dish) =>
          dish.id === action.payload.id
            ? { ...dish, amount: dish.amount - 1 }
            : dish
        ),
      };
    },
  },
});

export const cardDishes = (state) => state.cart.dishes;

export const {
  clearCart,
  incrementDishesAmount,
  decrementDishesAmount,
  addToCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
