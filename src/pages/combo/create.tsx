
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CreateComboInputType, createComboValidator } from '@/shared/create-combo-validator';
import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';
import { Character, Game } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { NotationData } from '@/types';
import StylizedHeading from '@/components/StylizedHeading';

const newStepData = [
  '214',
  'S'
];

const stepsData = {
  "steps": [
    ["2", "M"],
    ["5", "M"],
    ["5", "S"],
    ["SD", "66"],
    ["j", "M"],
    ["j", "2", "H"],
    ["land", "66"],
    ["5", "M"],
    ["jc", "j", "M"],
    ["j", "L", "j", "L"],
    ["j", "S"],
    ["236", "S"],
    ["SD", "j", "S"],
    ["214", "M", "~", "M"],
    ["236", "L", "M"]
  ]
};

const notationData: NotationData = {
  "steps": []
};

// stepsData.push(newStepData);
// notationData.steps = stepsData;
// notationData.steps.push(newStepData);
// console.log(notationData);

// const Step = () => {
//   return;
// };

const CreateComboForm = () => {
  const { data: games, isLoading: gamesLoading } = trpc.useQuery(["game.getAll"]);
  const { data: characters, isLoading: charactersLoading } = trpc.useQuery(["character.getAll"]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors
    }
  } = useForm<CreateComboInputType>({
    resolver: zodResolver(createComboValidator)
  });

  const { mutate, isLoading, data } = trpc.useMutation("combo.create", {
    onSuccess: (data) => {
      router.push(`/combo/${data.id}`);
    }
  });

  if (isLoading || data || !games || !characters) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit((data) => {
      mutate(data);
    })}>
      <Label>
        Game:
        <select {...register("gameId")} name="gameId" required>
          {games.map((game: Game, idx) => (<option key={idx} value={game.id}>{game.name}</option>))}
        </select>
      </Label>
      <Label>
        Character:
        <select {...register("characterId")} name="characterId" required>
          {characters.map((character: Character, idx) => (<option key={idx} value={character.id}>{character.name}</option>))}
        </select>
      </Label>
      <Label>
        Notation:
        <input
          {...register("notation")}
          type="text"
          placeholder='{"steps":[["2","M"], ["5", "M"], ...]}'
        />
      </Label>
      {errors?.notation && (<Error>{errors.notation.message}</Error>)}
      <Label>
        Damage:
        <input
          {...register("damage", { valueAsNumber: true })}
          type="number"
          min={0}
          max={100}
          step={1}
        />
      </Label>
      {errors?.damage && (<Error>{errors.damage.message}</Error>)}
      <Label>
        Meter gain:
        <input
          {...register("meterGain", { valueAsNumber: true })}
          type="number"
        />
      </Label>
      {errors?.meterGain && (<Error>{errors.meterGain.message}</Error>)}
      <Label>
        Works on:
        <input
          {...register("worksOn")}
          type="text"
        />
      </Label>
      {errors?.worksOn && (<Error>{errors.worksOn.message}</Error>)}
      <Label>
        Difficulty:
        <input
          {...register("difficulty")}
          type="text"
        />
      </Label>
      {errors?.difficulty && (<Error>{errors.difficulty.message}</Error>)}
      <Label>
        Notes:
        <input
          {...register("notes")}
          type="text"
        />
      </Label>
      {errors?.notes && (<Error>{errors.notes.message}</Error>)}
      <Actions>
        <Submit type="submit" value="Create combo" />
      </Actions>
    </Form>
  );
};

const ComboCreator: React.FC = () => {
  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <StylizedHeading fontSize={84}>Create Combo</StylizedHeading>
        <CreateComboForm />
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
  );
};

const Form = styled.form`
  display: flex;
  gap: 6px;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;

const OptionWrapper = styled.div`
  display: flex;
`;

const Submit = styled.input`
  display: block;
`;

const AddOption = styled.input`
  display: block;
`;

const Error = styled.p`
  color: red;
`;

const Actions = styled.div`
  display: flex;
`;

export default ComboCreator;