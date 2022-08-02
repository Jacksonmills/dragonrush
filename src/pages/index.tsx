import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { trpc } from "@/utils/trpc";
import { NotationData } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: characters, isLoading } = trpc.useQuery([
    "character.getAll"
  ]);
  const { data: combos } = trpc.useQuery(["combo.getAll"]);

  if (isLoading || !characters || !combos) return <div>Loading...</div>;
  combos.map((combo) => {
    const notation = combo?.notation as NotationData;
    notation.steps.forEach((step) => {
      console.log(JSON.stringify(step));
    });
  });

  return (
    <>
      <Header />
      <Layout>
        <Head>
          <title>Dragon Rush</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Dragon Rush</h1>
        {characters.map((character, idx) => (<CharacterName key={idx}><Link href={`/character/${character.tag}`}>{character.name}</Link></CharacterName>))}

        <div>
          <h2>Combos:</h2>
          {combos.map((combo, idx) => {
            const notation = combo?.notation as NotationData;
            return (
              <div key={idx}>
                <h3>Combo {idx + 1}</h3>
                <ul>
                  {notation.steps.map((step, idx) => (<li key={idx}>{step.map((i, idx) => (<span key={idx}>{i} </span>))}</li>))}
                </ul>
              </div>
            );
          })}
        </div>
      </Layout>
      <Footer />
    </>
  );
};

const Wrapper = styled.div``;

const CharacterName = styled.div`
  color: red;
`;

export default Home;
