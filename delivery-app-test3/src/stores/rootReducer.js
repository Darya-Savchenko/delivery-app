import { combineReducers } from 'redux';
import cartReducer from './cart/cartSlice';
import dishesReducer from './menu/dishesSlice';
import deliveryInfoReducer from './orderInfo/deliveryInfoSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  dishes: dishesReducer,
  deliveryInfo: deliveryInfoReducer,
});

export default rootReducer;
