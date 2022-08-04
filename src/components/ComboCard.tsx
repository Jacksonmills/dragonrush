import styled from 'styled-components';

import { COLORS } from '@/constants';
import { Play, Edit, Twitter, ChevronRight } from 'react-feather';

import ComboStep from './ComboStep';
import { Combo } from '@prisma/client';
import { NotationData } from '@/types';
import Link from 'next/link';

const ComboCard = (props: Combo) => {
  const notation = props.notation as NotationData;
  const steps = notation.steps.map((step, idx) => {
    return (
      <ComboStepWrapper key={idx}>
        <ComboStep inputs={step} sparking={false} />
        {idx !== notation.steps.length - 1 && (<ChevronRight />)}
      </ComboStepWrapper>
    );
  });

  const tagUrl = `https://twitter.com/search?q=%23DBFZ_${props.characterTag}&src=typed_query`;

  const handlePlayCombo = () => {
    console.log('Playing Combo...');
  };

  return (
    <Wrapper>
      <Controls>
        <Social>
          <ControlButton as='a' href={tagUrl} target='_blank'>
            <Twitter />
          </ControlButton>
        </Social>
        <ComboMenu>
          <ControlButton onClick={handlePlayCombo}>
            <Play />
          </ControlButton>

          <Link
            href={`/combo/${props.id}`}
            passHref
          >
            <EditLink><Edit /></EditLink>
          </Link>
        </ComboMenu>
      </Controls>
      <StepsWrapper>
        {steps}
      </StepsWrapper>
      <Information>
        <Info>
          {props.worksOn && <Location>Works on: {props.worksOn}</Location>}
          <Difficulty>({props.difficulty})</Difficulty>
          <Dmg>{`Damage: ${props.damage}%`}</Dmg>
        </Info>
        {props.notes}
      </Information>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ComboStepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  border: 4px solid black;
  background-color: black;
  color: white;
  padding: 0.5em 1em;
  margin: 1em;
  margin-bottom: -4px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const ComboMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Info = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  font-size: ${20 / 16}rem;
  font-weight: 500;
`;

const ControlButton = styled.button`
  display: inline-flex;
  color: white;
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  border: none;
  background-color: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.gray[900]};
  }
`;

const EditLink = styled.a`
  display: inline-flex;
  color: white;
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  border: none;
  background-color: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.gray[900]};
  }
`;

const Location = styled.span``;

const Dmg = styled.span``;

const Difficulty = styled.span``;
const Information = styled.div`
  background-color: white;
  color: black;
  padding: 0.5em 1em;
  margin: 1em;
  margin-top: -4px;
  border: 4px solid black;
  /* border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px; */
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  font-size: ${16 / 16}rem;
  font-weight: 500;

  @media (min-width: 768px) {
    margin-top: 4px;
  }
`;

const StepsWrapper = styled.ul`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  /* margin-top: 10px; */
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${COLORS.white};
  padding: 1em 1.5em;
  border: 4px solid black;

  @media (min-width: 768px) {
    padding: 2em 3em;
    box-shadow: -8px 8px 0px 0px black;
  }
`;

export default ComboCard;
