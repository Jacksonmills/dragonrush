import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';

const SiteLayoutWrapper = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <Header />
      <Layout>
        {children}
      </Layout>
      <Footer />
    </>
  );
};

export default SiteLayoutWrapper;