import Input from '@/components/Input';
import Sortable from '@/components/Sortable';
import UnstyledButton from '@/components/UnstyledButton';
import { COLORS } from '@/constants';
import { UniqueIdentifier } from '@dnd-kit/core';
import React from 'react';
import { X } from 'react-feather';
import styled from 'styled-components';

const SortableInput = ({
  droppableId,
  draggableId,
  payload,
  removeInput
}: {
  droppableId: UniqueIdentifier;
  draggableId: UniqueIdentifier;
  payload: string;
  removeInput: (arg0: UniqueIdentifier, arg1: UniqueIdentifier) => void;
}) => {
  return (
    <Sortable key={draggableId} id={draggableId} handle={true} type="INPUT">
      <InputWrapper>
        <Input input={payload} />
        <RemoveButton onClick={() => removeInput(droppableId, draggableId)}><X /></RemoveButton>
      </InputWrapper>
    </Sortable>
  );
};

const RemoveButton = styled(UnstyledButton)`
  --icon-size: ${18 / 16}rem;
  display: none;
  position: absolute;
  z-index: 999;
  top: -4px;
  right: -4px;
  padding: 2px;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  border-radius: 50%;

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
  }
`;

const InputWrapper = styled.div`
  ${RemoveButton} {
    display: flex;
  }

  @media (min-width: 768px) {
    ${RemoveButton} {
      display: none;
    }
    &:hover {
      ${RemoveButton} {
        display: flex;
      }
    }
  }
`;

export default SortableInput;