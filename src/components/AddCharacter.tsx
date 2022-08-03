import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Minimize2 } from 'react-feather';

import UnstyledButton from './UnstyledButton';
import Button from './Button';
import { COLORS } from '@/constants';
import { useSession } from 'next-auth/react';
import { trpc } from '@/utils/trpc';
import { Game } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { CreateCharacterInputType, createCharacterValidator } from '@/shared/create-character-validator';

const AddCharacter = () => {
  const router = useRouter();
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

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors
    }
  } = useForm<CreateCharacterInputType>({
    resolver: zodResolver(createCharacterValidator),
  });

  const { data: games, isLoading: gamesLoading } = trpc.useQuery(["game.getAll"]);
  if (gamesLoading || !games) return <div>Games loading...</div>;

  const { mutate, isLoading, data } = trpc.useMutation("character.create", {
    onSuccess: (data) => {
      router.push(`/character/${data.tag}`);
    }
  });
  if (isLoading || data) return <div>Loading...</div>;

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
            <AddCharacterForm onSubmit={handleSubmit((data) => mutate(data))}>
              <AddCharacterLabel>
                Game:
                <AddCharacterSelect {...register("gameId")} name="gameId" required>
                  {games.map((game: Game, idx) => (<option key={idx} value={game.id}>{game.name}</option>))}
                </AddCharacterSelect>
              </AddCharacterLabel>
              {errors?.gameId && (<Error>{errors.gameId.message}</Error>)}
              <AddCharacterLabel>
                Character Name:
                <AddCharacterInput
                  {...register("characterName")}
                  type="text"
                  name="characterName"
                  placeholder="Character name e.g. Goku Black"
                  required
                />
              </AddCharacterLabel>
              {errors?.characterName && (<Error>{errors.characterName.message}</Error>)}
              <AddCharacterLabel>
                Tag:
                <AddCharacterInput
                  {...register("tag")}
                  type="text"
                  name="tag"
                  placeholder="Character tag e.g. BLK"
                  required
                />
              </AddCharacterLabel>
              {errors?.tag && (<Error>{errors.tag.message}</Error>)}
              <AddCharacterLabel>
                Icon:
                <AddCharacterInput
                  {...register("iconUrl")}
                  type="text"
                  name="iconUrl"
                  placeholder="Icon asset e.g. http://www.dustloop.com/wiki/images/a/a3/DBFZ_Goku_Black_Icon.png"
                  required
                />
              </AddCharacterLabel>
              {errors?.iconUrl && (<Error>{errors.iconUrl.message}</Error>)}
              <AddCharacterLabel>
                Render:
                <AddCharacterInput
                  {...register("renderUrl")}
                  type="text"
                  name="renderUrl"
                  placeholder="Character render asset e.g. http://www.dustloop.com/wiki/images/d/df/DBFZ_Goku_Black_Portrait.png"
                  required
                />
              </AddCharacterLabel>
              {errors?.renderUrl && (<Error>{errors.renderUrl.message}</Error>)}
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
      <StyledButton onClick={() => setShowModal((state) => !state)}>
        Add Character
      </StyledButton>
      {showModal && <AddCharacterModal />}
    </>
  );
};

const StyledButton = styled(Button)`
  font-size: ${12 / 16}rem;
`;

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

const AddCharacterSelect = styled.select`
  padding: 1em;
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

const Error = styled.p`
  color: red;
`;

export default AddCharacter;