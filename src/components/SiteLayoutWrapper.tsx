import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';

const SiteLayoutWrapper = ({ children }: { children: React.ReactNode; }) => {
  return (
    <>
      <Head>
        <title>ComboZ</title>
        <meta name="description" content="Build share and practice combos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        {children}
      </Layout>
      <Footer />
    </>
  );
};

export default SiteLayoutWrapper;