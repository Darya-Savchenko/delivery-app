import { Button } from '../UI';

export const DishDetailCard = ({ dish, onAddDish }) => {
  return (
    <div
      className='p-4 m-4 rounded-lg bg-slate-50 w-[300px] flex justify-between
     flex-col gap-2'
    >
      <div className='w-full flex items-center justify-center'>
        <img
          src={dish.image}
          alt={dish.name}
          className='w-64 h-64 rounded-xl object-cover'
        />
      </div>
      <div className='flex items-center justify-between mt-3'>
        <h2 className='text-3xl'>{dish.name}</h2>
        <div className='flex justify-between'>
          <div className='text-3xl text-black'>{dish.price}$</div>
        </div>
      </div>
      <div className='w-full flex items-center justify-center mt-auto'>
        <Button onClick={onAddDish}>Add to Card</Button>
      </div>
    </div>
  );
};
