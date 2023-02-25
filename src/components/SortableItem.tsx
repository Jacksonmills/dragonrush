import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { DndProps } from './ComboBuilder';
import styled from 'styled-components';
import { Transform, CSS } from '@dnd-kit/utilities';


const SortableItem = ({ children, id, types }: DndProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id,
    data: {
      supports: types
    }
  });

  return (
    <Wrapper ref={setNodeRef} transform={transform} transition={transition} {...attributes} {...listeners}>{children}</Wrapper>
  );
};

const Wrapper = styled.div<{
  transform: Transform | null;
  transition: string | undefined;
}>`
  transform: ${props => props.transform && `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)`};
  transition: ${props => props.transition};
`;

export default SortableItem;