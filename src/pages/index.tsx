import type { NextPage } from "next";
import styled from "styled-components";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import ComboList from "@/components/ComboList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VisuallyHidden from "@/components/VisuallyHidden";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loggedIn = status === "authenticated";

  const { data: characters, isLoading } = trpc.useQuery([
    "character.getAll"
  ]);
  const { data: combos } = trpc.useQuery(["combo.getAll"]);
  if (isLoading || !characters || !combos) return <div>Loading...</div>;

  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <VisuallyHidden as="h1">ComboZ</VisuallyHidden>
        <WelcomeMessage>
          Welcome{' '}
          {loggedIn
            ? `${session?.user?.name}, lets build a combo!`
            : 'to ComboZ'}
        </WelcomeMessage>
        <p>Build and share combos!</p>
        <ComboList />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

const Wrapper = styled.div``;

const WelcomeMessage = styled.h2`
  font-size: ${32 / 16}rem;
`;

export default Home;
