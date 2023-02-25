import { COLORS } from "@/constants";
import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  /* margin-top: 10px; */
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${COLORS.white};
  padding: 1em 1.5em;
  border: 4px solid black;

  @media (min-width: 768px) {
    padding: 2em 3em;
    box-shadow: -8px 8px 0px 0px black;
  }
`;