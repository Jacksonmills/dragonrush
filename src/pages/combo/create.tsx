
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CreateComboInputType, createComboValidator } from '@/shared/create-combo-validator';
import { trpc } from '@/utils/trpc';
import React from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper';

type Notation = {
  steps: string[][];
};

const newStepData = [
  '214',
  'S'
];

const stepsData = [
  [
    "2",
    "M"
  ],
  [
    "5",
    "M"
  ],
  [
    "jc.",
    "M",
    "L",
    "L",
    "2",
    "H"
  ],
  [
    "SD"
  ],
  [
    "j.",
    "M",
    "L",
    "L",
    "2",
    "H"
  ],
  [
    "jc.",
    "L",
    "L",
    "L"
  ],
  [
    "236",
    "H",
    "S"
  ]
];

const notationData: Notation = {
  "steps": []
};

stepsData.push(newStepData);
notationData.steps = stepsData;
console.log(notationData);

const Step = () => {
  return;
};

const CreateComboForm = () => {
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

  if (isLoading || data) return <div>Loading...</div>;

  return (
    <Form onSubmit={handleSubmit((data) => {
      mutate(data);
    })}>
      <Label>
        Notation:
        <input
          {...register("notation")}
          type="text"
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
  display block;
`;

const Error = styled.p`
  color: red;
`;

const Actions = styled.div`
  display: flex;
`;

export default ComboCreator;