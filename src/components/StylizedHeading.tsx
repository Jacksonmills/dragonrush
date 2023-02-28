import { COLORS } from "@/constants";
import styled from "styled-components";

export default styled.h2<{
  fontSize: number;
}>`
  --font-size: ${props => `${props.fontSize / 20}rem`};
  --mobile-size: calc(var(--font-size) / 1.4);
  font-size: var(--mobile-size);
  text-align: center;
  line-height: 1;
  color: ${COLORS.black};
  border: 4px solid ${COLORS.black};
  background-color: ${COLORS.white};
  padding: 1rem;

  @media (min-width: 768px) {
    border: none;
    background-color: transparent;
    color: ${COLORS.white};
    font-size: var(--font-size);
    text-shadow: -4px 4px 0px ${COLORS.black};
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${COLORS.black};
  }
`;