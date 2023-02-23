import { COLORS } from "@/constants";
import styled from "styled-components";

export default styled.h2<{
  fontSize: number;
}>`
  --font-size: ${props => `${props.fontSize / 20}rem`};
  --mobile-size: calc(var(--font-size) / 1.4);
  /* font-size: ${props => `${props.fontSize / 20}rem`}; */
  font-size: var(--mobile-size);
  text-align: center;
  line-height: 1;
  color: ${COLORS.white};
  text-shadow: -4px 4px 0px ${COLORS.black};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${COLORS.black};

  @media (min-width: 768px) {
    font-size: var(--font-size);
  }
`;