import React, { useState, useEffect } from 'react';
import { RestaurantPreviewCard } from '../RestaurantPreviewCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 664 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 664, min: 0 },
    items: 1,
  },
};

export const RestaurantsPreview = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/restaurants`)
      .then((response) => response.json())
      .then((data) => setRestaurants(data?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className='container mx-auto pb-4 w-2/3 text-white'>
      <Carousel responsive={responsive}>
        {restaurants.length > 0 &&
          restaurants.map((restaurant, index) => {
            return (
              <div className='w-full p-3' key={index}>
                <RestaurantPreviewCard key={index} restaurant={restaurant} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
