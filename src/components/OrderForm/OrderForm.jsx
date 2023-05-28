import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

import { Button, Popup } from '../UI';
import { setDeliveryInfo } from '../../stores/orderInfo/deliveryInfoSlice';
import { cardDishes } from '../../stores/cart/cartSlice';

import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right-long-svgrepo-com.svg';

export const OrderForm = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const cart = useSelector(cardDishes);

  const popupTitle = 'Your order has been saved';
  const popupDescription = `Thank you for choosing our food delivery company. Please expect a call from our operator 
    within an hour to confirm your order.`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setDeliveryInfo(data));

    fetch(`${process.env.REACT_APP_API}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dishes: cart,
        deliveryInfo: {
          name: data.name,
          address: data.address,
          email: data.email,
          phoneNumber: data.phoneNumber,
          date: data.date,
        },
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setShowPopup(true);
        } else {
          console.log(response.json());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      className='md:w-2/3 md:mx-auto px-3 pt-1'
      onSubmit={handleSubmit(onSubmit)}
    >
      {showPopup && (
        <Popup
          title={popupTitle}
          description={popupDescription}
          showPopup={() => setShowPopup(false)}
        />
      )}
      <h3 className='pt-4 text-2xl md:text-center'>Address for the delivery</h3>
      <div className='mb-4 md:flex md:justify-between'>
        <div className='mb-4 md:mr-2 md:mb-0 flex-1'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='name'
          >
            Name
          </label>
          <input
            {...register('name', { required: true })}
            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none
            focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Enter your name'
          />
          {errors.name && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <div className='mb-4 md:mr-2 md:mb-0 flex-1'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='phoneNumber'
          >
            Phone number
          </label>
          <input
            {...register('phoneNumber', { required: true })}
            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none
            focus:outline-none focus:shadow-outline'
            id='phoneNumber'
            type='tel'
            placeholder='Enter your phone number'
          />
          {errors.phoneNumber && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
      </div>
      <div className='mb-4'>
        <label
          className='block mb-2 text-sm font-bold text-gray-700'
          htmlFor='streetAddress'
        >
          Address
        </label>
        <input
          {...register('address', { required: true })}
          className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none
          focus:outline-none focus:shadow-outline'
          id='address'
          type='text'
          placeholder='Enter your address'
        />
        {errors.address && (
          <span className='text-red-500'>This field is required</span>
        )}
      </div>
      <div className='mb-4 md:flex md:justify-between'>
        <div className='mb-4 md:mr-2 md:mb-0 flex-1'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='email'
          >
            Email
          </label>
          <input
            {...register('email', { required: true })}
            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none
            focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Enter your email'
          />
          {errors.email && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
        <div className='mb-4 md:mr-2 md:mb-0 flex-1'>
          <label
            className='block mb-2 text-sm font-bold text-gray-700'
            htmlFor='date'
          >
            Delivery date and time
          </label>
          <input
            {...register('date', { required: true })}
            className='w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none
            focus:outline-none focus:shadow-outline'
            id='date'
            type='datetime-local'
          />
          {errors.date && (
            <span className='text-red-500'>This field is required</span>
          )}
        </div>
      </div>
      <div className='flex justify-end p-2'>
        <Button variant='dark' className='flex items-center' type='submit'>
          <span className='mr-1'>Submit</span>
          <ArrowRightSvg />
        </Button>
      </div>
    </form>
  );
};
