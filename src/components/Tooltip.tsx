import styled, { keyframes } from 'styled-components';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';

import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/animations/shift-away-subtle.css';

import UnstyledButton from '../UnstyledButton';
import { COLORS } from '@/constants';

const Tooltip = ({
  content,
  children,
  type = 'default',
  placement = 'bottom',
  wrapperStyles = {},
  href,
  when = true,
  ...delegated
}) => {
  const shouldRenderTooltip = !!when;

  if (!shouldRenderTooltip) {
    return children;
  }

  return (
    <>
      <StyledTooltip
        content={content}
        hideOnClick={false}
        placement={placement}
        animation='shift-away-subtle'
        {...delegated}
        plugins={type === 'default' ? [followCursor] : null}
      >
        <ContentWrapper href={href} style={wrapperStyles} as='a'>
          {children}
        </ContentWrapper>
      </StyledTooltip>
    </>
  );
};

const enterKeyframesBottom = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(20px);
  }
`;

const enterKeyframesTop = keyframes`
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(-20px);
  }
`;

const StyledTooltip = styled(Tippy)`
  && {
    padding: 2px 6px 4px;
    font-weight: 500;
    text-align: center;

    border: none;
    border-radius: 6px;
    color: ${COLORS.black};
  }
  &.tippy-box {
    background-color: hsl(0, 0%, 100%);
  }
  &.tippy-box[data-placement^='top'] > .tippy-arrow::before {
    border-top-color: hsl(0, 0%, 100%);
  }
  &.tippy-box[data-placement^='bottom'] > .tippy-arrow::before {
    border-bottom-color: hsl(0, 0%, 100%);
  }
  &.tippy-box[data-placement^='left'] > .tippy-arrow::before {
    border-left-color: hsl(0, 0%, 100%);
  }
  &.tippy-box[data-placement^='right'] > .tippy-arrow::before {
    border-right-color: hsl(0, 0%, 100%);
  }
`;

const ContentWrapper = styled(UnstyledButton)`
  display: inline-flex;
`;

export default Tooltip;
