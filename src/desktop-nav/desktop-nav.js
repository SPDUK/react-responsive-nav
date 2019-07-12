import React, { Component } from 'react';
import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import {
  GridContainer,
  GridItem,
  GridItemLink,
  ContentGroupContainer,
  Arrow,
  MovingDiv,
  ContentRow
} from './desktop-nav-styles';

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

const OffScreenPadding = 10;

export const ContentGroup = ({ title, width, height, background }) => (
  <>
    {title}
    {width}x{height}
    {background}
  </>
);

class SiteNav extends Component {
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

  /**
   * Injects index and left properties into MenuData
   */
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
        const siteNavWidth = target.parentNode.clientWidth;
        leftOffset = toData.width / 2 - (left + width / 2);
        rightOffset = toData.width / 2 - (siteNavWidth - (left + width / 2));

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

SiteNav.propTypes = {
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
  breakpoint: PropTypes.number
};

export default SiteNav;
