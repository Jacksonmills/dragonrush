import styled from 'styled-components';

import Image from 'next/image';

const Attack = ({ button }: { button: string; }) => {
  const src = `/images/button/${button}.png`;

  return (
    <Wrapper>
      <Image src={src} width={36} height={36} layout='fixed' alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs((props) => ({
  type: 'button',
  tabIndex: '0',
}))`
  display: flex;
  padding: 5px;
  z-index: 2;
`;

export default Attack;
