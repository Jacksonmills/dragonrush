import styled from "styled-components";

export default styled.span<{
  fontSize: number,
  color: string,
}>`
  font-size: ${props => `${props.fontSize / 16}rem`};
  letter-spacing: 2px;
  font-family: 'Sayian Sans';
  color: ${props => props.color};
  margin-right: auto;
  cursor: pointer;

  span {
    font-family: 'Sayian Sans';
    display: none;
    @media (min-width: 768px) {
      display: inline-block;
    }
  }
`;