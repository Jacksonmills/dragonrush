import styled from 'styled-components';

import Image from 'next/image';

import Input from './Input';

const ComboStep = ({ inputs, sparking }: { inputs: (string | number)[]; sparking: boolean; }) => {
  return (
    <>
      <Wrapper
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

const Wrapper = styled.li<{ sparking: boolean; }>`
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
