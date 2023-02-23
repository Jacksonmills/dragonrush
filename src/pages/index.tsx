import type { NextPage } from "next";
import styled from "styled-components";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import ComboList from "@/components/ComboList";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import VisuallyHidden from "@/components/VisuallyHidden";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";
import { PlusCircle, Tool } from "react-feather";
import Link from "next/link";
import Button from "@/components/Button";
import { COLORS } from "@/constants";
import StylizedHeading from "@/components/StylizedHeading";
import CreateComboButton from "@/components/CreateComboButton";

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
        <WelcomeWrapper>
          <WelcomeMessage>
            <StylizedHeading fontSize={84}>
              {loggedIn
                ? `Welcome ${session?.user?.name}, lets build a combo!`
                : 'Build and share combos!'}
            </StylizedHeading>
          </WelcomeMessage>
          <WelcomeActions>
            <Link href='/combo/create' passHref>
              <HeroButton>Build <Tool /></HeroButton>
            </Link>
          </WelcomeActions>
        </WelcomeWrapper>
        <ComboList />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

const Wrapper = styled.div``;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 60px 0;

  @media (min-width: 768px) {
    padding: 120px 60px;
  }
`;

const WelcomeMessage = styled.div``;
const WelcomeActions = styled.div`
  display: flex;
  flex-grow: 1
`;

const HeroButton = styled(Button)`
  --foreground-color: ${COLORS.white};
  --background-color: ${COLORS.secondary};
  --hover-color: #8b0007;
  padding: 16px 24px;
  font-size: ${32 / 16}rem;
  gap: 16px;
`;

export default Home;
