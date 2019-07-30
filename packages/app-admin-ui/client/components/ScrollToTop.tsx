import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: Node;
};

const ScrollToTop = ({ children }: Props) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return children;
};

export default ScrollToTop;
