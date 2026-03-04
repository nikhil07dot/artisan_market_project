import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase(); // normalize casing
  const hideHeader = path === '/login' || path === '/signup';

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
