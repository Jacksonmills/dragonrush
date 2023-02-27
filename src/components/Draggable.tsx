import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import styled from 'styled-components';
import { Transform } from '@dnd-kit/utilities';
import { DndProps } from './ComboBuilder';

const Draggable = ({ children, id, type, payload }: DndProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      type,
      payload: payload,
    }
  });

  return (
    <Wrapper
      ref={setNodeRef}
      transform={transform}
      isDragging={isDragging}
      {...listeners}
      {...attributes}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  transform: Transform | null;
  isDragging: boolean;
}>`
  position: relative;
  transform: ${props => props.transform && `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)`};
  z-index: 9999;
  cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')};
`;

export default Draggable;