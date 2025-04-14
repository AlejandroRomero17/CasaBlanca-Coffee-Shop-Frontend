import AppRoutes from "@/router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
