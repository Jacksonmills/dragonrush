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
          isDragging={attributes["aria-pressed"]}
          style={style}
          handle={handle}
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
  handle?: boolean;
}>`
  position: relative;
  z-index: ${props => (props.isDragging ? '99' : 'unset')};
  ${props => !props.handle && `cursor: ${(props.isDragging ? 'grabbing' : 'grab')};`}
  ${props => props.isDragging && `
    outline: 2px dashed ${COLORS.gray[500]};
    outline-offset: 4px;
    border-radius: 6px;
  `}
`;

export const Handle = styled.div<{
  isDragging?: boolean;
}>`
  --handle-size: ${18 / 16}rem;
  position: absolute;
  bottom: -4px;
  left: -4px;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  padding: 2px;
  border-radius: 50%;
  cursor: ${props => (props.isDragging ? 'grabbing' : 'grab')};
  display: flex;

  svg {
    width: var(--handle-size);
    height: var(--handle-size);
  }

  @media (min-width: 768px) {
    display: none;

    *:active > &, *:hover > & {
      display: flex;
    }
  }
`;

export default Sortable;