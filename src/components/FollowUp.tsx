import styled from 'styled-components';

import Image from 'next/image';

const FollowUp = () => {
  return (
    <Wrapper tabIndex={0}>
      <Image
        src='/images/misc/follow_up.png'
        width={36}
        height={26}
        layout='fixed'
        alt=""
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 5px;
`;

export default FollowUp;
