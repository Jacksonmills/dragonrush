import React from 'react';
import { Tool } from 'react-feather';
import Button from './Button';
import styled from 'styled-components';
import { COLORS } from '@/constants';

const CreateComboButton = ({ children }: { children: React.ReactNode; }) => {
  return (
    <Wrapper>{children}</Wrapper>
  );
};

const Wrapper = styled(Button)`
  display: flex;
  flex-grow: 1;
  gap: 12px;
  border-radius: 50px;
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};

  &:hover {
    filter: brightness(1.4);
    background-color: ${COLORS.secondary};
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;

export default CreateComboButton;