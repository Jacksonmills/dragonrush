import styled from 'styled-components';

import ComboCard from './ComboCard';
import { Combo } from '@prisma/client';

const ComboList = ({ randomCharacter, combos }: { randomCharacter?: string; combos: Combo[]; }) => {
  return (
    <ComboWrapper>
      {combos &&
        combos.map((combo) => (
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
