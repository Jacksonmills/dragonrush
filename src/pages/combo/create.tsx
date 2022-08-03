
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CreateComboInputType, createComboValidator } from '@/shared/create-combo-validator';
import { trpc } from '@/utils/trpc';
import React from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

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
        Damage:
        <input
          {...register("damage")}
          type="number"
          value={0}
        />
      </Label>
      {errors?.damage && (<Error>{errors.damage.message}</Error>)}
      <Actions>
        <Submit type="submit" value="Create combo" />
        <AddOption type="button" value="Add step" onClick={() => console.log("Adding step")} />
      </Actions>
    </Form>
  );
};

const ComboCreator: React.FC = () => {
  return (
    <MaxWidthWrapper>
      <CreateComboForm />
    </MaxWidthWrapper>
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