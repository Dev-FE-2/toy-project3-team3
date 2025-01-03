import Header from '@/components/layout/Header/Header';
import Nav from '@/components/layout/Nav/Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Nav />
    </div>
  );
};

export default Layout;
