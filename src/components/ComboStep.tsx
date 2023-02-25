import styled from 'styled-components';

import Image from 'next/image';

import Input from './Input';
import { COLORS } from '@/constants';

const ComboStep = ({
  inputs,
  sparking = false,
  isEditMode = false }: {
    inputs: string[];
    sparking?: boolean;
    isEditMode?: boolean;
  }) => {
  return (
    <>
      <Wrapper
        isEditMode={isEditMode}
        sparking={sparking}
        style={{
          ['--background-color' as any]: `${sparking ? '#ff9dad' : 'hsla(0, 0%, 0%, 0.25)'}`,
          ['--active-color' as any]: '#ffd86c',
        }}
      >
        {inputs.map((input, idx) => {
          return <Input key={idx} input={input} />;
        })}
        {sparking ? (
          <Image src='/images/effect/sparking_active.png' layout='fill' alt="" />
        ) : null}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{
  isEditMode: boolean;
  sparking: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  justify-content: center;
  background: var(--background-color);
  background: linear-gradient(
    90deg,
    var(--background-color) 0%,
    hsl(0, 0%, 100%) 90%
  );
  border: ${props => props.isEditMode ? `2px dashed ${COLORS.gray[500]}` : undefined};
  border-radius: 12px;
  padding: 4px 8px;

  img {
    object-fit: cover;
  }

  &:focus-within {
    background: var(--active-color);
  }
`;

export default ComboStep;
