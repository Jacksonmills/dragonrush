import React, { useState, useEffect, FormEvent } from 'react';
import { useSpring, animated } from 'react-spring';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Minimize2 } from 'react-feather';

import UnstyledButton from './UnstyledButton';
import Button from './Button';
import { COLORS } from '@/constants';
import { useSession } from 'next-auth/react';
import { trpc } from '@/utils/trpc';

const AddCharacter = () => {
  const { data: session, status } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const styles = useSpring({
    willChange: 'transform',
    transform: isHovered ? `scale(1.1)` : `scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });

  const [game, setGame] = useState('');
  const [character, setCharacter] = useState('');
  const [tag, setTag] = useState('');
  const [icon, setIcon] = useState('');
  const [render, setRender] = useState('');

  const { data: games, isLoading } = trpc.useQuery(["game.getAll"]);
  if (!games || isLoading) return <div>Games loading...</div>;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      characterValue: { value: string; };
      tagValue: { value: string; };
      iconValue: { value: string; };
      renderValue: { value: string; };
    };
    // const uid = session?.user; // TODO: use current
    const characterValue = character;
    const tagValue = tag;
    const iconValue = icon;
    const renderValue = render;

    const response = await
      fetch("/api/characters", {
        method: "POST",
        body: JSON.stringify({ character: characterValue, tag: tagValue, icon: iconValue, render: renderValue }),
        headers:
        {
          "Content-Type": "application/json",
        },
      });
    const data = await response.json();
    console.log(data);
    setGame('');
    setCharacter('');
    setTag('');
    setIcon('');
    setRender('');
  }

  const AddCharacterModal = () => {
    const modalDiv: HTMLElement = document.getElementById('modal')!;

    return createPortal(
      <AddCharacterPortal>
        <Wrapper>
          <Modal>
            <AnimatedDiv
              style={styles}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CloseButton onClick={() => setShowModal((state) => !state)}>
                <Minimize2 />
              </CloseButton>
            </AnimatedDiv>
            <AddCharacterForm onSubmit={handleSubmit}>
              <AddCharacterLabel>
                Game:
                <select id="games" name="games" required onChange={(e) => setGame(e.target.value)}>
                  {games.map((game, idx) => (<option key={idx} value={game.id}>{game.name}</option>))}
                </select>
              </AddCharacterLabel>
              <AddCharacterLabel>
                Character Name:
                <AddCharacterInput
                  onChange={(e) => setCharacter(e.target.value)}
                  type="text"
                  name="character"
                  value={character}
                  placeholder="Character name e.g. Goku Black"
                  required
                />
              </AddCharacterLabel>
              <AddCharacterLabel>
                Tag:
                <AddCharacterInput
                  onChange={(e) => setTag(e.target.value)}
                  type="text"
                  name="tag"
                  value={tag}
                  placeholder="Character tag e.g. BLK"
                  required
                />
              </AddCharacterLabel>
              <AddCharacterLabel>
                Icon:
                <AddCharacterInput
                  onChange={(e) => setIcon(e.target.value)}
                  type="text"
                  name="icon"
                  value={icon}
                  placeholder="Icon asset e.g. http://www.dustloop.com/wiki/images/a/a3/DBFZ_Goku_Black_Icon.png"
                  required
                />
              </AddCharacterLabel>
              <AddCharacterLabel>
                Render:
                <AddCharacterInput
                  onChange={(e) => setRender(e.target.value)}
                  type="text"
                  name="render"
                  id="render"
                  value={render}
                  placeholder="Character render asset e.g. http://www.dustloop.com/wiki/images/d/df/DBFZ_Goku_Black_Portrait.png"
                  required
                />
              </AddCharacterLabel>
              <br />
              <Button type='submit'>Add</Button>
            </AddCharacterForm>
          </Modal>
        </Wrapper>
      </AddCharacterPortal>,
      modalDiv
    );
  };

  return (
    <>
      <Button onClick={() => setShowModal((state) => !state)}>
        Add Character
      </Button>
      {showModal && <AddCharacterModal />}
    </>
  );
};

const AddCharacterPortal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: hsla(0, 0%, 0%, 0.60);
`;

const AddCharacterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AddCharacterInput = styled.input`
  background-color: ${COLORS.gray[100]};
  border: none;
  border-radius: 4px;
  padding: 1em;

  &:focus-within {
    border-color: black;
    outline-color: black;
  }
`;

const AddCharacterLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  width: 100%;
`;

const Modal = styled.div`
  position: relative;
  padding: 80px 40px;
  background-color: hsl(0, 0%, 100%);
  min-width: 60vw;
  max-width: 90vw;
  border-radius: 4px;
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

export default AddCharacter;