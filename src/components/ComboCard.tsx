import styled from 'styled-components';

import { COLORS } from '@/constants';
import { Play, ExternalLink, Twitter, ChevronRight, Edit } from 'react-feather';

import ComboStep from './ComboStep';
import { Combo } from '@prisma/client';
import { NotationData } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import Card from './Card';

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

  const handleEditCombo = () => {
    console.log('Editing Combo...');
  };

  return (
    <Wrapper>
      <Controls>
        <Social>
          <ControlButton as='a' href={tagUrl} target='_blank'>
            <Twitter />
          </ControlButton>
          <Link
            href={`/combo/${props.id}`}
            passHref
          >
            <PageLink><ExternalLink /></PageLink>
          </Link>
          <Link
            href={`/character/${props.characterTag}`}
            passHref
          >
            <PageLink as='a'>{props.characterTag}</PageLink>
          </Link>
        </Social>
        <ComboMenu>
          <ControlButton onClick={handlePlayCombo}>
            <Play />
          </ControlButton>
          <ControlButton onClick={handleEditCombo}>
            <Edit />
          </ControlButton>
        </ComboMenu>
      </Controls>
      <Card>
        {steps}
      </Card>
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

const CharacterPageLink = styled(Button)`
  padding: 4px 8px;
  font-size: ${12 / 16}rem;
`;

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

const PageLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${14 / 16}rem;
  font-weight: bold;
  padding: 4px;
  border-radius: 4px;
  border: none;
  background-color: none;
  background: none;
  cursor: pointer;
  text-decoration: none;

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

export default ComboCard;
