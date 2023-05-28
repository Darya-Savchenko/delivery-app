import { useEffect, useState } from 'react';
import { CouponCard } from '../../components/CouponCard';

export const Coupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/coupons`)
      .then((response) => response.json())
      .then((data) => setCoupons(data?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className='flex flex-wrap justify-canter items-center bg-white'>
      {coupons &&
        coupons?.map((coupon, index) => {
          return <CouponCard coupon={coupon} key={index} />;
        })}
    </div>
  );
};
