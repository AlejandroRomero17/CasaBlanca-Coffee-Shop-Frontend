// src/App.tsx
import { Suspense } from "react";
import AppRoutes from "@/router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Spinner } from "@/components/ui/spinner";

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex justify-center py-16">
            <Spinner size="large" />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
