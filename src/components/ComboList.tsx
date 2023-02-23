import styled from 'styled-components';

import ComboCard from './ComboCard';
import { Combo } from '@prisma/client';
import { trpc } from '@/utils/trpc';
import SiteLayoutWrapper from './SiteLayoutWrapper';
import MaxWidthWrapper from './MaxWidthWrapper';

const NoCombosFound = () => {
  return (
    <MaxWidthWrapper>
      <NoCombosMessage>No combos found!</NoCombosMessage>
    </MaxWidthWrapper>
  );
};

const NoCombosMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const ComboList = ({ characterTag }: { characterTag?: string; }) => {
  const { data: combos, isLoading } = characterTag ? trpc.useQuery(["combo.getByTag", { tag: characterTag }]) : trpc.useQuery(["combo.getAll"]);
  if (isLoading || !combos) return <div>Loading...</div>;
  if (combos.length <= 0) return <NoCombosFound />;

  return (
    <ComboWrapper>
      {combos?.map((combo: Combo) => (
        <ComboCard
          key={`${combo.id}`}
          {...combo}
        />
      ))}
    </ComboWrapper>
  );
};

const ComboWrapper = styled.div`
  position: relative;
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  grid-gap: 24px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default ComboList;
