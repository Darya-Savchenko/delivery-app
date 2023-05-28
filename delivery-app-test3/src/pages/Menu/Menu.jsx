import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { fetchDishes, selectAllDishes } from '../../stores/menu/dishesSlice';
import { DishDetailCard } from '../../components/DishDetailCard';
import { Tabs } from '../../components/Tabs';
import {
  addToCart,
  cardDishes,
  incrementDishesAmount,
} from '../../stores/cart/cartSlice';
import { Popup } from '../../components/UI';

export const Menu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(selectAllDishes);
  const cart = useSelector(cardDishes);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const popupTitle = 'One Restaurant at a Time';
  const popupDescription = `We kindly request you to choose dishes from a single restaurant for each order. 
        This allows us to ensure the best dining experience for you. Please select your preferred restaurant 
        and explore their delightful menu. Should you have any questions or need assistance, our team is here to help. 
        Enjoy your meal!`;

  useEffect(() => {
    dispatch(fetchDishes());
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onAddDish = (dish) => {
    const existingDish = cart.find((item) => item.id === dish.id);

    if (existingDish) {
      dispatch(incrementDishesAmount(dish));
      return;
    }

    if (cart.length > 0) {
      if (dish.restaurant !== cart[0].restaurant) {
        setShowPopup(true);
      } else {
        dispatch(addToCart(dish));
      }
    } else {
      dispatch(addToCart(dish));
    }
  };

  const onTabSwitch = (newActiveTab) => {
    setActiveTab(newActiveTab);
    let restaurants = menu.dishes.map((dish) => dish.name);
    let index = restaurants.findIndex(
      (restaurant) => newActiveTab === restaurant
    );

    if (index > -1) {
      setActiveTabIndex(index);
    } else {
      setActiveTabIndex(0);
    }
  };

  return (
    <div className='bg-white'>
      {showPopup && (
        <Popup
          title={popupTitle}
          description={popupDescription}
          showPopup={() => setShowPopup(false)}
        />
      )}
      {menu.status !== 'fulfilled' ? (
        <div>Loading...</div>
      ) : (
        <div className='menu-wrapper'>
          <div className='menu-items flex flex-row'>
            {menu.dishes.length > 0 && (
              <Tabs
                list={menu.dishes.map((dish) => dish.name)}
                activeTab={activeTab}
                onTabSwitch={onTabSwitch}
              />
            )}
          </div>
          <div className='flex flex-row flex-wrap mx-3'>
            {menu.dishes.length > 0 &&
              menu.dishes[activeTabIndex].dishes.map((dish, index) => {
                return (
                  <DishDetailCard
                    key={index}
                    dish={dish}
                    onAddDish={() => onAddDish(dish)}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
