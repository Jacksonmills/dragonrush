import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import styled from 'styled-components';
import { DndProps } from './ComboBuilder';
import { COLORS, INPUTS } from '@/constants';

const Droppable = ({ children, id, type, accepts }: DndProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type,
      accepts
    }
  });

  return (
    <Wrapper
      ref={setNodeRef}
      isOver={isOver}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  isOver: boolean,
}>`
  outline: ${props => (props.isOver ? `2px dashed ${COLORS.black}` : undefined)};
  outline-offset: ${props => (props.isOver ? '2px' : undefined)};
  border-radius: 10px;
  width: 100%;
  height: auto;
`;

export default Droppable;