import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ComboList from '@/components/ComboList';
import { GetStaticPaths, GetStaticProps } from 'next';
import Footer from '@/components/Footer';

const Characters = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <>
      <Header />
      <Layout>
        <ImageWrapper>
          {/* <Image src={character.renderUrl} layout='fill' priority alt="" /> */}
        </ImageWrapper>
        <MaxWidthWrapper>
          {/* {combos.length > 0 && (<Heading>{character.character} Combos</Heading>)}
          <ComboList combos={combos} /> */}
        </MaxWidthWrapper>
      </Layout>
      <Footer />
    </>
  );
};

const Heading = styled.h1`
  position: relative;
  font-size: ${44 / 16}rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 84px;
  height: 100%;
  border-right: 4px solid black;

  img {
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: .6;
  }
`;

export default Characters;
