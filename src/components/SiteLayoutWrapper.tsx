import { COLORS } from '@/constants';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import AddCharacter from './AddCharacter';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';

const SiteLayoutWrapper = ({ children }: { children: React.ReactNode; }) => {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <>
      <Head>
        <title>ComboZ</title>
        <meta name="description" content="Build share and practice combos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Layout>
        {isDev && (
          <AdminNav>
            <AdminHeader>Admin</AdminHeader>
            <AddCharacter />
          </AdminNav>
        )}
        {children}
      </Layout>
      <Footer />
    </>
  );
};

const AdminHeader = styled.h2`
  font-size: ${22 / 16}rem;
  margin-right: auto;
`;

const AdminNav = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
  padding: 6px 24px;
`;

export default SiteLayoutWrapper;