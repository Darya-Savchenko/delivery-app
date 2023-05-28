import { useSelector } from 'react-redux';

import useTabSwitch from '../../hooks/useTabSwitch';
import { cardDishes } from '../../stores/cart/cartSlice';
import { Tabs } from '../../components/Tabs';
import { OrderForm } from '../../components/OrderForm/OrderForm';
import { DishesSummery } from '../../components/DishesSummery';
import { Button } from '../../components/UI';

import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right-long-svgrepo-com.svg';

export const Cart = () => {
  const cart = useSelector(cardDishes);
  const tabs = ['Summary', 'Delivery'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summery');

  if (!cart.length) {
    return (
      <div className='bg-white h-full flex items-center justify-center p-4'>
        <h1>Your Cart is empty</h1>
      </div>
    );
  }

  return (
    <div className='bg-white h-screen text-black mx-auto mt-2 border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8'>
      <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== 'Summery' ? 'hidden' : ''}`}>
        <DishesSummery onTabSwitch={handleTabSwitch} />
        <div className='flex justify-end p-2'>
          <Button
            variant='dark'
            className='flex items-center'
            onClick={() => handleTabSwitch('Delivery')}
          >
            <span className='mr-1'>Next</span>
            <ArrowRightSvg />
          </Button>
        </div>
      </div>
      <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
        <OrderForm onTabSwitch={handleTabSwitch} />
      </div>
    </div>
  );
};
