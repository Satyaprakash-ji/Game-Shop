import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import Footer from "../components/Footer/Footer";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <header>
        <NavigationBar />
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default RootLayout;
