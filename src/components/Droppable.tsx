import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import styled from 'styled-components';
import { DndProps } from './ComboBuilder';

const Droppable = ({ children, id, type }: DndProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: {
      type: type
    }
  });

  return (
    <Wrapper ref={setNodeRef} isOver={isOver}>{children}</Wrapper>
  );
};

const Wrapper = styled.div<{
  isOver: boolean,
}>`
  background-color: ${props => (props.isOver ? 'green' : undefined)};
  width: 100%;
  height: auto;
`;

export default Droppable;