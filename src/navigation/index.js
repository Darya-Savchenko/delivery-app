import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Header } from '../components/Header';
import { Home } from '../pages/Home';
import { Cart } from '../pages/Cart';
import { Menu } from '../pages/Menu';
import { Coupons } from '../pages/Coupons';
import { Orders } from '../pages/Orders';
import { cardDishes } from '../stores/cart/cartSlice';

const Navigation = () => {
  const dishesInCart = useSelector(cardDishes);
  return (
    <BrowserRouter>
      <Header cartCount={dishesInCart.length} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Orders />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/coupons' element={<Coupons />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
