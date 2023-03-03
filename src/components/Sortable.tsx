import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { DndProps } from './ComboBuilder';
import styled from 'styled-components';
import { Transform } from '@dnd-kit/utilities';
import { Move } from 'react-feather';
import { COLORS } from '@/constants';
import { CSS } from '@dnd-kit/utilities';


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

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <>
      {handle ? (
        <Wrapper
          ref={setNodeRef}
          transform={transform}
          transition={transition}
          style={style}
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
          style={style}
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