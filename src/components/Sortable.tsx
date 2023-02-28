import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { DndProps } from './ComboBuilder';
import styled from 'styled-components';
import { Transform } from '@dnd-kit/utilities';
import { Move } from 'react-feather';
import { COLORS } from '@/constants';


const Sortable = ({ children, id, type, accepts, handle = false }: DndProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: id,
    data: {
      type,
      accepts
    },
  });

  return (
    <>
      {handle ? (
        <Wrapper
          ref={setNodeRef}
          transform={transform}
          transition={transition}
          isDragging={attributes["aria-pressed"]}
        >
          {children}
          <Handle isDragging={attributes["aria-pressed"]} className="handle" {...attributes} {...listeners}><Move /></Handle>
        </Wrapper>
      ) : (
        <Wrapper
          ref={setNodeRef}
          transform={transform}
          transition={transition}
          isDragging={attributes["aria-pressed"]}
          {...attributes}
          {...listeners}
        >
          {children}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div<{
  transform: Transform | null;
  transition: string | undefined;
  isDragging?: boolean;
}>`
  position: relative;
  z-index: ${props => (props.isDragging ? '99' : 'unset')};
  transform: ${props => props.transform && `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)`};
  transition: ${props => props.transition};
`;

export const Handle = styled.div<{
  isDragging?: boolean;
}>`
  position: absolute;
  bottom: -10px;
  left: -10px;
  background-color: ${COLORS.white};
  padding: 2px;
  border-radius: 50%;
  cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')};
  border: 2px solid ${COLORS.black};
  display: flex;
  

  @media (min-width: 768px) {
    display: none;

    *:active > &, *:hover > & {
      display: flex;
    }
  }
`;

export default Sortable;