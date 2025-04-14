import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/sections/HeroSection";
import SpecialMenu from "@/components/sections/SpecialMenu";
import AboutUs from "@/components/sections/AboutUs";
import DeliveryInfo from "@/components/sections/DeliveryInfo";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Café artesanal en CasaBlanca Coffee</title>
        <meta
          name="description"
          content="Disfruta café de especialidad, recién preparado, en CasaBlanca. Pide en línea y conoce nuestro menú premium."
        />
        <meta
          name="keywords"
          content="café, coffee shop, artesanal, especialidad, casa blanca, menú, pedidos"
        />
        <meta name="author" content="CasaBlanca Coffee" />
      </Helmet>

      <HeroSection />
      <SpecialMenu />
      <AboutUs />
      <DeliveryInfo />
    </>
  );
};

export default Home;
