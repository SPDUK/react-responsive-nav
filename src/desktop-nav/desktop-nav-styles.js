import styled, { keyframes, css } from 'styled-components';

import kebabCase from 'lodash.kebabcase';

const arrowHeight = 8;
const perspective = 4000;

const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.25;
const moveArrowSeconds = 0.25;
const fadeOutContentSeconds = 0.3;
const fadeInContentSeconds = 0.35;

export const setFromProps = camelCaseKey => css`
  ${props => (props[camelCaseKey] ? `${kebabCase(camelCaseKey)}: ${props[camelCaseKey]}` : null)}
`;
export const GridContainer = styled.div`
  z-index: 9999;
  // use visibility hidden instead of display none because menu flashes when breakpoint changes for some reason!
  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    position: absolute;
    visibility: hidden;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    display: grid;
    ${setFromProps('justifyContent')};
    justify-items: stretch;
    grid-template-columns: repeat(
      ${({ columns }) => columns},
      ${({ columnWidth }) => columnWidth}px
    );
    grid-template-rows: ${({ rowHeight }) => rowHeight}px;
    position: relative;
    ${setFromProps('background')};
    ${setFromProps('color')};
    ${setFromProps('fontFamily')};
    ${setFromProps('fontSize')}px;
  }
`;
export const GridItemLink = styled.a`
  grid-column: ${({ index }) => index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
  ${setFromProps('color')};

  &:visited {
    ${setFromProps('color')};
  }
`;
export const GridItem = styled.div`
  grid-column: ${({ index }) => index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
    cursor: default;
  }
`;
export const ContentRow = styled.div`
  grid-column: 1 / span ${({ columns }) => columns};
  grid-row: 2 / span 1;
  position: relative;
  height: 0;
`;
export const Move = (fromData, toData) => keyframes`
0% {
  left: ${fromData.left}px;
  width: ${fromData.width}px;
  height: ${fromData.height}px;
}
50% {
  width: ${toData.width}px; 
}

100% {
  left: ${toData.left}px;
  width: ${toData.width}px;
  height: ${toData.height}px;
}
`;
export const FadeIn = keyframes`
from {
  opacity: 0;
  transform: perspective(${perspective}px) rotateX(-15deg);
  transform-origin: top center;
}

to {
  opacity: 1;
  transform: perspective(${perspective}px) rotateX(0deg);
  transform-origin: top center;
}
`;
export const FadeOut = keyframes`
0% {
  opacity: 1;
  transform: perspective(${perspective}px) rotateX(0deg);
  transform-origin: top center;
}

100% {
  opacity: 0;
  transform-origin: top center;
  transform: perspective(${perspective}px) rotateX(-15deg);
  visibility: hidden;
}
`;
export const MovingDiv = styled.div`
  opacity: 1;
  ${setFromProps('color')};
  ${setFromProps('background')};
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ fromData }) => (fromData ? fromData.left : 0)}px;
  width: ${({ fromData }) => (fromData ? fromData.width : 0)}px;
  height: ${({ fromData }) => (fromData ? fromData.height : 0)}px;
  display: ${({ display }) => display};
  border-radius: 4px;
  box-shadow: 0 8px 28px 1px rgba(138, 126, 138, 0.67); // Ripped from: https://www.cssmatic.com/box-shadow
  animation: ${({ fadeOut, display, fromData, toData }) => {
      if (fadeOut) return FadeOut;
      if (display === 'block') {
        if (fromData.left === toData.left) return FadeIn;
        if (fromData) return Move(fromData, toData);
      }
      return ''; // display: none; don't animate
    }}
    // fade out and in slower than moving sideways
    ${({ fadeOut, display, fromData, toData }) => {
      if (fadeOut) return `${fadeOutSeconds}s`;
      if (display === 'block') {
        if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
        if (fromData) return `${moveSeconds}s`; // move
      }
      return '0s'; // display: none; don't animate
    }}
    forwards ease;
`;
export const FadeInArrow = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
}
`;
export const FadeOutArrow = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;
export const calculateArrowMarginLeft = (data, leftOffset, rightOffset) => css`
  margin-left: ${data
    ? data.left +
      data.width / 2 -
      leftOffset +
      rightOffset -
      arrowHeight -
      (leftOffset > 0 || rightOffset > 0 ? OffScreenPadding : 0)
    : 0}px;
`;
export const MoveArrow = (fromData, toData, leftOffset, rightOffset) => keyframes`
from {
  ${calculateArrowMarginLeft(fromData, leftOffset, rightOffset)}
}

to {
  ${calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
}
`;
export const Arrow = styled.div`
top: -${({ top }) => arrowHeight - top}px;
z-index: 1;
position: absolute;
${({ toData, leftOffset, rightOffset }) =>
  calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
display: ${({ display, toData }) => {
  if (toData && toData.width === 0 && toData.height === 0) {
    return 'none';
  }
  return display;
}};
width: 0; 
height: 0;
border-left: ${arrowHeight}px solid transparent;
border-right: ${arrowHeight}px solid transparent;
border-bottom: ${arrowHeight}px solid ${({ background }) => background};
animation: ${({ fadeOut, display, fromData, toData, leftOffset, rightOffset }) => {
  if (fadeOut) return FadeOutArrow;
  if (display === 'block') {
    if (fromData.left === toData.left) return FadeInArrow;
    if (fromData) return MoveArrow(fromData, toData, leftOffset, rightOffset);
  }
  return ''; // display: none; don't animate
}}

// fade out and in slower than moving sideways
${({ fadeOut, display, fromData, toData }) => {
  if (fadeOut) return `${fadeOutSeconds}s`;
  if (display === 'block') {
    if (fromData.left === toData.left) return `${fadeInSeconds}s`; // fade in
    if (fromData) return `${moveArrowSeconds}s`; // move
  }
  return '0s'; // display: none; don't animate
}}

forwards ease;
`;
export const FadeInContent = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1;
}
`;
export const FadeOutContent = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
  visibility: hidden;
}
`;
export const ContentGroupContainer = styled.div`
  position: absolute;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  z-index: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) =>
    show ? 'auto' : 'none'}; // disregard mouse event if content group is inactive
  animation: ${({ show, fadeOut }) => {
      if (show) return FadeInContent;
      if (fadeOut) return FadeOutContent;
      return ''; // cold start and everything else just show without animation
    }}
    ${({ show }) => (show ? `${fadeInContentSeconds}` : `${fadeOutContentSeconds}`)}s forwards;
`;
