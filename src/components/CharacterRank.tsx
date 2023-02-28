import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Minimize2 } from 'react-feather';

import UnstyledButton from './UnstyledButton';
import Button from './Button';
import { COLORS } from '@/constants';
import { Character } from '@prisma/client';
import StylizedHeading from './StylizedHeading';
import Spacer from './Spacer';
import ScrollLock from 'react-scrolllock';

const CharacterRank = ({ characters }: { characters: Character[]; }) => {
  const [showCharacters, setShowCharacters] = useState(false);
  const [rankings, setRankings] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const modalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!localStorage.getItem("userRankings")) { // checks for users existing rankings
      setShowCharacters((state) => !state); // create popup
    }
  }, []);

  const styles = useSpring({
    willChange: 'transform',
    transform: isHovered ? `scale(1.1)` : `scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  return createPortal(
    <PortalRef ref={modalRef}>
      <ScrollLock>
        <CharacterPortal>
          <Overlay onClick={() => setShowCharacters((state) => !state)} />
          <Wrapper>
            <Modal>
              <AnimatedDiv
                style={styles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <CloseButton onClick={() => setShowCharacters((state) => !state)}>
                  <Minimize2 />
                </CloseButton>
              </AnimatedDiv>
              <StylizedHeading fontSize={54}>Tier<Spacer axis="horizontal" size={12} />Z</StylizedHeading>
              <Spacer axis="vertical" size={12} />
              <Links>
                {characters &&
                  characters.map((character: Character) => {
                    return (
                      <li key={character.id}>
                        <Link
                          href='/character/[id]'
                          as={`/character/${character.tag}`}
                          passHref
                        >
                          <ImageWrapper
                            onClick={() => setShowCharacters((state) => !state)}
                          >
                            <Image
                              src={character.iconUrl}
                              width={133}
                              height={79}
                              priority
                              alt=""
                            />
                          </ImageWrapper>
                        </Link>
                      </li>
                    );
                  })}
              </Links>
            </Modal>
          </Wrapper>
        </CharacterPortal>
      </ScrollLock>
    </PortalRef>,
    document.body
  );
};

const PortalRef = styled.div<{
  ref: any;
}>``;

const Links = styled.ul`
  display: flex;
  row-gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const CharacterPortal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.60);
`;

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;

  cursor: default;
  cursor: url(/images/misc/dragon_ball_cursor.png) 32 64, default;
  cursor: url(/images/misc/dragon_ball_cursor.png) 32 64, auto;
`;

const Modal = styled.div`
  position: relative;
  padding: 80px 40px;
  background-color: hsl(0, 0%, 100%);
  min-width: 60vw;
  max-width: 90vw;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -4px 0px inset;
`;

const AnimatedDiv = styled(animated.div)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const CloseButton = styled(UnstyledButton)`
  display: flex;
  padding: .5em;
  cursor: pointer;
`;

const ImageWrapper = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 133 / 79;
  cursor: inherit;
  overflow: visible;
  will-change: transform, filter;
  transition: all 400ms ease;
  transition-property: transform, filter;

  &:hover {
    transform: translate(-2px, -2px) translateZ(0);
    filter: brightness(1.1);
    will-change: transform, filter;
    transition: all 100ms ease;
    transition-property: transform, filter;
  }
`;

export default CharacterRank;
