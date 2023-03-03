import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import styled from 'styled-components';
import { Transform } from '@dnd-kit/utilities';
import { DndProps } from './ComboBuilder';
import { CSS } from '@dnd-kit/utilities';

const Draggable = ({ children, id, type, payload }: DndProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      type,
      payload: payload,
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Wrapper
      ref={setNodeRef}
      transform={transform}
      isDragging={isDragging}
      style={style}
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
  z-index: 99;
  cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')};
`;

export default Draggable;