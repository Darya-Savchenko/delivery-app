import { Banner } from '../../components/Banner';
import { About } from '../../components/About';
import { RestaurantsPreview } from '../../components/RestaurantsPreview';
import { Footer } from '../../components/Footer';

export const Home = () => {
  return (
    <>
      <Banner />
      <RestaurantsPreview />
      <About />
      <Footer />
    </>
  );
};
