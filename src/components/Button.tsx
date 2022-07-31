import { COLORS } from '@/constants';
import styled from 'styled-components';

export default styled.button`
  border: none;
  border-radius: 4px;
  padding: 1em 2em;
  font-size: ${14 / 16}rem;
  font-weight: bold;
  background-color: ${COLORS.gray[100]};
  cursor: pointer;
  transition: background-color 100ms ease;

  &:hover {
    background-color: ${COLORS.gray[300]};
  }

  @media (min-width: 768px) {
    font-size: ${18 / 16}rem;
  }
`;