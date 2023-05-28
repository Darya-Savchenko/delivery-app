import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
  error: null,
  status: 'idle',
};

export const fetchDishes = createAsyncThunk(
  'products/fetchDishes',
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/dishes-by-restaurants`
    );
    const data = await response.json();
    return data;
  }
);

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDishes.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.dishes = [...action.payload.data];
    });
    builder.addCase(fetchDishes.pending, (state, action) => {
      state.status = 'pending';
    });
  },
});

export const { getDishes } = dishesSlice.actions;

export default dishesSlice.reducer;

export const selectAllDishes = (state) => state.dishes;
