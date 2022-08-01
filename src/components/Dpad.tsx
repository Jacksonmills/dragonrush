import styled from 'styled-components';

import Image from 'next/image';

const Dpad = ({ direction }: { direction: number; }) => {
  const src = `/images/dpad/${direction}.png`;
  return (
    <Wrapper tabIndex={0}>
      <Image src={src} width={36} height={36} layout='fixed' alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
  z-index: 2;
`;

export default Dpad;
