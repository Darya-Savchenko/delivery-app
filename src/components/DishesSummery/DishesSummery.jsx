import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import { cardDishes } from '../../stores/cart/cartSlice';
import { DishSummeryCard } from '../DishesSummeryCard/DishSummeryCard';
import { Button } from '../UI';

import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right-long-svgrepo-com.svg';

export const DishesSummery = ({ onTabSwitch }) => {
  const cart = useSelector(cardDishes);

  const [couponCode, setCouponCode] = useState(
    localStorage.getItem('couponCode')
  );
  const [total, setTotal] = useState(0);
  const [sale, setSale] = useState('');
  const [coupons, setCoupons] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    countTotal();
    setTotalPrice(total + sale);
  }, [cart, sale]);

  useEffect(() => {
    setTotalPrice(total + sale);

    fetch(`${process.env.REACT_APP_API}/api/coupons`)
      .then((response) => response.json())
      .then((data) => setCoupons(data?.data))
      .catch((e) => console.log(e));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('couponCode', data.couponCode);

    let coupon = couponCode
      ? coupons.find((coupon) => coupon.code === data.couponCode)
      : {};

    setSale(coupon?.sale);
  };

  const countTotal = () => {
    let res = cart
      .reduce((total, dish) => {
        return total + dish.amount * dish.price;
      }, 0)
      .toFixed(2);
    setTotal(res);
  };

  return (
    <div className='flex flex-col'>
      {cart &&
        cart?.map((dish, index) => {
          return <DishSummeryCard dish={dish} key={index} />;
        })}
      <div className='flex justify-between flex-wrap'>
        <form
          className='md:w-2/3 md:mx-auto px-3 pt-1'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col p-2'>
            <label className='p-1 lg:text-3xl' htmlFor='couponCode'>
              Apply Coupon:
            </label>
            <input
              {...register('couponCode')}
              className='w-64 px-3 py-2 mb-3 text-sm leading-tight text-gray-700
               border rounded shadow appearance-none focus:outline-none
               focus:shadow-outline'
              id='couponCode'
              type='text'
              placeholder='Enter your coupon code'
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              variant='dark'
              className='flex items-center justify-center w-20'
              onClick={onSubmit}
              type='submit'
            >
              Apply
            </Button>
          </div>
        </form>
        <div className='flex flex-col p-2'>
          <div className='p-1 lg:text-3xl'>
            Total: {(Number(total) + Number(sale)).toFixed(2)}$
          </div>
        </div>
      </div>
    </div>
  );
};
