import { Link } from 'react-router-dom';

import { Button } from '../UI';

export const RestaurantPreviewCard = ({ restaurant }) => {
  return (
    <div
      className='w-full p-4 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center flex
    justify-between flex-col gap-2'
    >
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className='w-[400px] h-[250px]'
      />
      <h2 className='pb-2 text-lg'>{restaurant.name}</h2>
      <Link to='/menu'>
        <Button>Open Menu</Button>
      </Link>
    </div>
  );
};
