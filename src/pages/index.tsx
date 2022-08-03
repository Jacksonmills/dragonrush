import type { NextPage } from "next";
import styled from "styled-components";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import ComboList from "@/components/ComboList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VisuallyHidden from "@/components/VisuallyHidden";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";
import { PlusCircle } from "react-feather";
import Link from "next/link";
import Button from "@/components/Button";
import { COLORS } from "@/constants";

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
        <div>
          <Link href='/combo/create' passHref>
            <CreateComboButton>Create Combo <PlusCircle /></CreateComboButton>
          </Link>
        </div>
        <ComboList />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

const Wrapper = styled.div``;

const WelcomeMessage = styled.h2`
  font-size: ${32 / 16}rem;
`;

const CreateComboButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 50px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};

  &:hover {
    filter: brightness(1.4);
    background-color: ${COLORS.secondary};
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;

export default Home;
