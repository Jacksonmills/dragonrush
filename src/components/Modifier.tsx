import styled from 'styled-components';

import { COLORS } from '@/constants';
import React from 'react';
import { Toolbox } from '@/pages/dnd';

const Modifier = ({ children, reverse = false, isEditMode = false }: { children: React.ReactNode; reverse?: boolean; isEditMode?: boolean; }) => {
  return (
    <Wrapper reverse={reverse} isEditMode={isEditMode}>
      <TextWrapper reverse={reverse} isEditMode={isEditMode}>
        <Text>{children}</Text>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  reverse: boolean;
  isEditMode: boolean;
}>`
  display: inline-block;
  padding: 0 5px;
  z-index: 1;

  ${props => !props.isEditMode && (
    `
      margin-right: ${props.reverse ? '5px' : '-24px'};
      margin-left: ${props.reverse ? '-24px' : '5px'};
    `
  )}
`;

const TextWrapper = styled.span<{
  reverse: boolean;
  isEditMode: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${14 / 16}rem;
  font-weight: 700;
  color: ${COLORS.black};
  background: #63ffc0;
  background: linear-gradient(0deg, #63ffc0 0%, white 80%);
  border: 0.5px solid ${COLORS.white};
  box-shadow: 0 0 0 1.2px black, 0 0 2px 1.4px #6d6d6d;
  min-width: 20px;
  border-radius: 1px;

  ${props => !props.isEditMode && (
    `
      padding: ${props.reverse ? '0px 5px 1px 16px' : '0px 16px 1px 5px'};
    `
  )}

  /* default */
  /* border-top-right-radius: ${(props) => (props.reverse ? '1px' : '0')};
  border-bottom-right-radius: ${(props) => (props.reverse ? '1px' : '0')}; */

  /* reversed */
  /* border-top-left-radius: ${(props) => (props.reverse ? '0' : '1px')};
  border-bottom-left-radius: ${(props) => (props.reverse ? '0' : '1px')}; */
`;

const Text = styled.span`
  filter: drop-shadow(0 0 1px white);
`;

export default Modifier;
