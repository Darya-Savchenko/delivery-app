import { CopyToClipboard } from 'react-copy-to-clipboard/src';

import { Button } from '../UI';

export const CouponCard = ({ coupon }) => {
  return (
    <div className='p-4 m-4 rounded-lg bg-slate-50 w-[300px] flex justify-between flex-col gap-2'>
      <div className='w-full flex items-center justify-center'>
        <img
          src={coupon.image}
          alt={coupon.name}
          className='w-64 h-64 rounded-xl object-cover'
        />
      </div>
      <div className='flex items-center justify-between mt-3'>
        <h2 className='text-3xl'>{coupon.name}</h2>
      </div>
      <div className='w-full flex items-center justify-between mt-auto'>
        <div className='text-xl text-black'>Code: {coupon.code}</div>
        <CopyToClipboard text={coupon.code}>
          <Button>Copy</Button>
        </CopyToClipboard>
      </div>
    </div>
  );
};
