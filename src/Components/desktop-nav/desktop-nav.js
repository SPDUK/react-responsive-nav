import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import kebabCase from 'lodash.kebabcase';

const defaultRootAlign = 'center';
const defaultColor = '#fff';
const defaultColumnWidth = 80;
const defaultRowHeight = 45;
const defaultBackground = 'rgba(0,0,0,0)';
const defaultBreakpoint = 670;
const defaultContentBackground = '#fff';
const defaultContentColor = '#323232';
const defaultContentWidth = 320;
const defaultContentHeight = 200;
const defaultContentTop = 0;
const arrowHeight = 8;
const perspective = 4000;
const fadeOutSeconds = 0.34;
const fadeInSeconds = 0.25;
const moveSeconds = 0.25;
const moveArrowSeconds = 0.25;
const fadeOutContentSeconds = 0.25;
const fadeInContentSeconds = 0.25;
const OffScreenPadding = 10;

const setFromProps = camelCaseKey => css`
  ${props => (props[camelCaseKey] ? `${kebabCase(camelCaseKey)}: ${props[camelCaseKey]}` : null)}
`;

const GridContainer = styled.div`
  z-index: 999;
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
const GridItemLink = styled.a`
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
const GridItem = styled.div`
  grid-column: ${({ index }) => index + 1} / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.5;
    cursor: default;
  }
`;
const ContentRow = styled.div`
  grid-column: 1 / span ${({ columns }) => columns};
  grid-row: 2 / span 1;
  position: relative;
  height: 0;
`;
const Move = (fromData, toData) => keyframes`
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
const FadeIn = keyframes`
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
const FadeOut = keyframes`
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
const MovingDiv = styled.div`
  opacity: 1;
  overflow: hidden;
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
    forwards ease-out;
`;
const FadeInArrow = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutArrow = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;
const calculateArrowMarginLeft = (data, leftOffset, rightOffset) => css`
  margin-left: ${data
    ? data.left +
      data.width / 2 -
      leftOffset +
      rightOffset -
      arrowHeight -
      (leftOffset > 0 || rightOffset > 0 ? OffScreenPadding : 0)
    : 0}px;
`;
const MoveArrow = (fromData, toData, leftOffset, rightOffset) => keyframes`
  from {
    ${calculateArrowMarginLeft(fromData, leftOffset, rightOffset)}
  }
  
  to {
    ${calculateArrowMarginLeft(toData, leftOffset, rightOffset)}
  }
`;
const Arrow = styled.div`
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
  
  forwards ease-out;
`;
const FadeInContent = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;
const FadeOutContent = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;
const ContentGroupContainer = styled.div`
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
export const ContentGroup = ({ title, width, height, background }) => (
  <>
    {title}
    {width}x{height}
    {background}
  </>
);

class DesktopNav extends Component {
  state = {
    display: 'none',
    fadeOut: false,
    fromData: null,
    toData: null,
    leftOffset: 0,
    rightOffset: 0
  };

  static defaultProps = {
    align: defaultRootAlign,
    columnWidth: defaultColumnWidth,
    rowHeight: defaultRowHeight,
    background: defaultBackground,
    contentBackground: defaultContentBackground,
    contentColor: defaultContentColor,
    contentTop: defaultContentTop,
    breakpoint: defaultBreakpoint,
    color: defaultColor,
    debug: false
  };

  // Injects index and left properties into MenuData
  memoizeMenuData = memoize((columnWidth, children) =>
    React.Children.map(children, (child, i) => {
      // if width and height are not specified, that means we don't want to render the content group i.e. we only
      // want to render root item
      const { width, height } = child.props;
      let sanitisedWidth;
      let sanitisedHeight;

      if (!width && !height) {
        sanitisedWidth = 0;
        sanitisedHeight = 0;
      } else {
        // if width or height is not specified, add defaults
        sanitisedWidth = width || defaultContentWidth;
        sanitisedHeight = height || defaultContentHeight;
      }

      return {
        ...child.props, // order is important here! spread child.props after height, followed by width.
        height: sanitisedHeight,
        width: sanitisedWidth,
        index: i,
        left: (i + 1) * columnWidth - columnWidth / 2 - sanitisedWidth / 2
      };
    })
  );

  memoizeGridItems = memoize((children, color) =>
    React.Children.map(children, (child, i) => {
      const { title, rootUrl } = child.props;

      if (rootUrl) {
        return (
          <GridItemLink
            href={rootUrl}
            key={`menu-title-${i}`}
            index={i}
            onMouseEnter={e => this.onMouseEnter(e.target, i)}
            color={color}
          >
            {title}
          </GridItemLink>
        );
      }

      return (
        <GridItem
          key={`menu-title-${i}`}
          index={i}
          onMouseEnter={e => this.onMouseEnter(e.target, i)}
          color={color}
        >
          {title}
        </GridItem>
      );
    })
  );

  memoizeContent = memoize((children, fromData, toData) =>
    React.Children.map(children, (child, i) => (
      <ContentGroupContainer
        key={`content-group-${i}`}
        show={toData && toData.index === i}
        fadeOut={fromData && fromData.index === i}
      >
        {child.props.children}
      </ContentGroupContainer>
    ))
  );

  memoizeColumns = memoize(children => React.Children.count(children));

  memoizeAlign = memoize(align => {
    switch (align) {
      case 'left':
        return 'start';
      case 'right':
        return 'end';
      default:
        return 'center';
    }
  });

  close = () => {
    if (this.props.debug) return;
    this.setState(prevState => ({ fadeOut: true, fromData: prevState.toData }));
  };

  onMouseEnter = (target, menuDataIndex) => {
    this.setState(prevState => {
      const fadeOut = false;
      const display = 'block';
      const toDataOriginal = this.memoizeMenuData(this.props.columnWidth, this.props.children)[
        menuDataIndex
      ];
      const toData = { ...toDataOriginal };
      let leftOffset = 0;
      let rightOffset = 0;

      if (target) {
        // off screen detection
        // target is rootGridItem
        const { left, width } = target.getBoundingClientRect();
        const DesktopNavWidth = target.parentNode.clientWidth;
        leftOffset = toData.width / 2 - (left + width / 2);
        rightOffset = toData.width / 2 - (DesktopNavWidth - (left + width / 2));

        if (leftOffset > 0) {
          // if off screen, toData.left needs to be moved to be on-screen!
          toData.left += leftOffset + OffScreenPadding;
        } else {
          leftOffset = 0;
        }

        if (rightOffset > 0) {
          toData.left -= rightOffset - OffScreenPadding;
        } else {
          rightOffset = 0;
        }

        let fromData;
        if (prevState.fadeOut || !prevState.toData) {
          // on cold start, pop up right from the current item
          fromData = toData;
        } else {
          // on warm start, start animation from the previous item
          fromData = prevState.toData;
        }

        return {
          display,
          fadeOut,
          fromData,
          toData,
          leftOffset,
          rightOffset
        };
      }
    });
  };

  onMouseLeave = () => this.close();

  onClickMovingDiv = () => this.close();

  render() {
    const {
      columnWidth,
      rowHeight,
      background,
      contentBackground,
      contentColor,
      contentTop,
      children,
      align,
      fontSize,
      fontFamily,
      color,
      breakpoint
    } = this.props;
    const { fromData, toData, display, fadeOut, leftOffset, rightOffset } = this.state;
    const columns = this.memoizeColumns(children);
    const rootGridItems = this.memoizeGridItems(children, color);
    const content = this.memoizeContent(children, fromData, toData);
    const justifyContent = this.memoizeAlign(align);
    const contentBackgroundSanitised = (toData && toData.background) || contentBackground;

    return (
      <GridContainer
        background={background}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        justifyContent={justifyContent}
        fontSize={fontSize}
        fontFamily={fontFamily}
        color={color}
        breakpoint={breakpoint}
        /* Below are not configurable */
        onMouseLeave={this.onMouseLeave}
        columns={columns}
      >
        {rootGridItems}
        <ContentRow columns={columns}>
          <Arrow
            display={display}
            fadeOut={fadeOut}
            fromData={fromData}
            toData={toData}
            top={contentTop}
            onClick={this.onClickMovingDiv}
            background={contentBackgroundSanitised}
            leftOffset={leftOffset}
            rightOffset={rightOffset}
          />
          <MovingDiv
            display={display}
            fadeOut={fadeOut}
            fromData={fromData}
            toData={toData}
            color={contentColor}
            top={contentTop}
            onClick={this.onClickMovingDiv}
            background={contentBackgroundSanitised}
          >
            {content}
          </MovingDiv>
        </ContentRow>
      </GridContainer>
    );
  }
}

DesktopNav.propTypes = {
  columnWidth: PropTypes.string,
  rowHeight: PropTypes.number,
  background: PropTypes.string,
  contentBackground: PropTypes.string,
  contentColor: PropTypes.string,
  contentTop: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node),
  align: PropTypes.string,
  fontSize: PropTypes.string,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  breakpoint: PropTypes.number,
  debug: PropTypes.bool
};

export default DesktopNav;
