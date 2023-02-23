import { COLORS } from '@/constants';
import styled from 'styled-components';

export default styled.button`
  --foreground-color: ${COLORS.black};
  --background-color: ${COLORS.gray[100]};
  --hover-color: ${COLORS.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: ${16 / 16}rem;
  font-weight: bold;
  color: var(--foreground-color);
  background-color: var(--background-color);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 100ms ease;

  &:hover {
    background-color: var(--hover-color);
  }

  @media (min-width: 768px) {
    font-size: ${18 / 16}rem;
  }

  svg {
    display: inline-flex;
    width: 1em;
    height: 1em;
  }
`;