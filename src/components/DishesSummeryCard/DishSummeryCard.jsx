import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  cardDishes,
  decrementDishesAmount,
  incrementDishesAmount,
  removeFromCart,
} from '../../stores/cart/cartSlice';
import { Button } from '../UI';

export const DishSummeryCard = ({ dish }) => {
  const dispatch = useDispatch();
  const cart = useSelector(cardDishes);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className='flex p-1 sm:p-2 border border-b-gray-200 justify-between items-center'>
      <div className='product-image border border-gray-200 rounded-lg sm:1-1/3'>
        <img src={dish.image} alt={dish.name} className='w-40 h-40' />
      </div>
      <div className='product-info'>
        <h3 className='lg:text-3xl'>{dish.name}</h3>
        <div className='price lg:text-3xl'>{dish.price}$</div>
      </div>
      <div className='dish-price-qt flex flex-col items-center justify-center'>
        <div className='quantity flex'>
          <button
            className='p-1 lg:text-3xl'
            disabled={dish.amount <= 0}
            onClick={() => dispatch(decrementDishesAmount(dish))}
          >
            -
          </button>
          <span className='p-1 lg:text-3xl'>{dish.amount}</span>
          <button
            className='p-1 lg:text-3xl'
            onClick={() => dispatch(incrementDishesAmount(dish))}
          >
            +
          </button>
        </div>
        <Button
          variant='secondary'
          onClick={() => dispatch(removeFromCart(dish))}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
