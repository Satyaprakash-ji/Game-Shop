import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Jab bhi page change ho, yeh top par scroll karega
  }, [pathname]);

  return null;
};

export default ScrollToTop;
