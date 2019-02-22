import React from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
