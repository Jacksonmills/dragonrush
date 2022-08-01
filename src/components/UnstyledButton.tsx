import styled from 'styled-components';

export default styled.button`
  display: block;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;

  &:focus {
    outline-offset: 2px;
  }
`;