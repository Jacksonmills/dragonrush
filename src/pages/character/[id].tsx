import styled from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import clientPromise from '@/lib/mongodb';

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Combos from '@/components/Combos';
import { ComboZCharacter, ComboZCombo } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Footer from '@/components/Footer';

const Characters = (
  {
    character,
    characters,
    combos
  }: {
    character: ComboZCharacter;
    characters: ComboZCharacter[];
    combos: ComboZCombo[];
  }) => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <>
      <Header characters={characters} />
      <Layout>
        <ImageWrapper>
          <Image src={character.render} layout='fill' priority />
        </ImageWrapper>
        <MaxWidthWrapper>
          {combos.length > 0 && (<Heading>{character.character} Combos</Heading>)}
          <Combos combos={combos} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = await clientPromise;
    const db = await client.db('comboz');

    const charactersData = await db.collection('characters').find({}).toArray();
    const characters: ComboZCharacter[] = JSON.parse(JSON.stringify(charactersData));

    const paths = characters.map((character) => ({
      params: { id: character.tag }
    }));

    return {
      paths,
      fallback: false
    };
  } catch (err) {
    console.error(err);
    return {
      paths: [],
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = await clientPromise;
    const db = await client.db('comboz');

    const charactersData = await db.collection('characters').find({}).toArray();
    const characterData = await db.collection('characters').findOne(
      { tag: params?.id },
      {
        projection: {
          _id: 1,
          character: 1,
          tag: 1,
          icon: 1,
          render: 1,
        },
      }
    );
    const combosData = await db
      .collection('combos')
      .find({ character: params?.id })
      .toArray();

    const characters = JSON.parse(JSON.stringify(charactersData));
    const character = JSON.parse(JSON.stringify(characterData));
    const combos = JSON.parse(JSON.stringify(combosData));

    return {
      props: {
        isConnected: true,
        characters,
        character,
        combos
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { isConnected: false },
    };
  }
};

export default Characters;
