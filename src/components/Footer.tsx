import styled from 'styled-components';
import Link from 'next/link';
import { GitHub, Flag } from 'react-feather';
import { COLORS } from '@/constants';
import Logo from './Logo';

const Footer = () => {
  return (
    <Wrapper>
      <Link href='/'>
        <StyledLogo fontSize={48} color={COLORS.white}><span>Combo</span>Z</StyledLogo>
      </Link>
      <Links>
        <Link href='https://github.com/Jacksonmills/dragonrush'>
          <a>
            <GitHub />
          </a>
        </Link>
        <Link href='https://creativecommons.org/licenses/by-nc-sa/3.0/' passHref>
          <DisclaimerTrigger tabIndex={0} aria-label='Content disclaimer, opens dialog' aria-live='polite'>
            <Flag />
            <PopUp>
              <Disclaimer>
                Disclaimer: Content is available under CC  BY-NC-SA 3.0 unless otherwise noted. Game content and materials are trademarks and copyrights of their respective publisher and its licensors. All rights reserved.
              </Disclaimer>
            </PopUp>
          </DisclaimerTrigger>
        </Link>
      </Links>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  width: 100%;
  background: ${COLORS.black};
  border-top: 4px solid ${COLORS.white};
  display: flex;
  row-gap: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  z-index: 99;
`;

const StyledLogo = styled(Logo)`
  margin-right: auto;
`;

const Links = styled.ul`
  display: flex;
  gap: 16px;

  a {
    display: flex;
    color: ${COLORS.white};
    font-size: ${24 / 16}rem;
    font-weight: bold;
    text-decoration: none;
    transition: filter 200ms ease;
    padding: 6px;
    margin-right: -6px;
    border-radius: 4px;

    &:hover {
      background-color: #161616;
    }
  }
`;

const Disclaimer = styled.p`
  display: flex;
  align-items: center;
  font-size: ${14 / 16}rem;
`;

const PopUp = styled.div`
  --background-color: ${COLORS.white};
  --color: ${COLORS.black};

  position: absolute;
  bottom: 100%;
  right: 0;
  display: block;
  min-width: 300px;
  padding: 1em;
  color: var(--color);
  background-color: var(--background-color);
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(12px);
  transition: transform 200ms ease, opacity 200ms ease;
  z-index: 100;

  &:focus-within {
    pointer-events: initial;
    opacity: 1;
    transform: translateY(-12px);
  }

  &:before {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 8px;
    width: 10px;
    height: 10px;
    background-color: var(--background-color);
    border-radius: 2px;
    transform: rotate(45deg);
  }

  button {
    width: 100%;
  }
`;

const DisclaimerTrigger = styled.a`
  position: relative;
  cursor: pointer;

  &:hover, &:focus {
    ${PopUp} {
      pointer-events: initial;
      opacity: 1;
      transform: translateY(-12px);
    }
  }
`;

export default Footer;
