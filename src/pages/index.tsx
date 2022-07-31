import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: characters, isLoading } = trpc.useQuery([
    "character.getAll"
  ]);

  if (isLoading || !characters) return <div>Loading...</div>;
  console.log(characters);

  return (
    <>
      <Head>
        <title>Dragon Rush</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Dragon Rush</h1>
      {characters.map((character, idx) => (<CharacterName key={idx}>{character.name}</CharacterName>))}

      <div>
        <h2>Combos:</h2>
      </div>
    </>
  );
};

const CharacterName = styled.div`
  color: red;
`;

export default Home;
