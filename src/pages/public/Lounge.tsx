// src/pages/Lounge.tsx
import { Helmet } from "react-helmet-async";
import LoungeHero from "@/components/sections/lounge/LoungeHero";
import LoungeInfo from "@/components/sections/lounge/LoungeInfo";
import LoungeFeatures from "@/components/sections/lounge/LoungeFeatures";
// import LoungeReservation from "@/components/sections/lounge/LoungeReservation"; // ← Importa el index
import LoungeReservation from "@/components/sections/lounge/LoungeReservation";
// import LoungeReservation from "@/components/sections/lounge/LoungeReservation/index"

const Lounge = () => {
  return (
    <>
      <Helmet>
        <title>Lounge de Té y Café | CasaBlanca Coffee</title>
        <meta
          name="description"
          content="Descubre el Lounge de CasaBlanca: un espacio premium donde el café de especialidad y el té exótico se combinan con una experiencia sensorial única."
        />
        <meta
          name="keywords"
          content="lounge, café de especialidad, té exótico, CasaBlanca, postres gourmet, ambiente premium"
        />
        <meta name="author" content="CasaBlanca Coffee" />

        {/* Open Graph */}
        <meta property="og:title" content="Lounge de Té y Café | CasaBlanca" />
        <meta
          property="og:description"
          content="Un refugio acogedor con cafés y tés especiales. Vive la experiencia CasaBlanca en nuestro exclusivo lounge."
        />
        <meta property="og:image" content="/social-card.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://casablanca.coffee/lounge" />
      </Helmet>
      <LoungeHero />
      <LoungeInfo />
      <LoungeFeatures />
      <LoungeReservation /> {/* ← Aquí */}
    </>
  );
};

export default Lounge;
