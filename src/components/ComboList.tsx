import styled from 'styled-components';

import ComboCard from './ComboCard';
import { Combo } from '@prisma/client';
import { trpc } from '@/utils/trpc';

const ComboList = ({ randomCharacter }: { randomCharacter?: string; }) => {
  const { data: combos, isLoading } = randomCharacter ? trpc.useQuery(["combo.getByTag", { tag: randomCharacter }]) : trpc.useQuery(["combo.getAll"]);
  if (isLoading || !combos) return <div>Loading...</div>;
  if (combos.length <= 0) return <div>No combos found!</div>;

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
