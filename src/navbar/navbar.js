import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { StyledNav } from './navbar-styles';
import MobileMenu from '../mobile-menu/mobile-menu';
import DesktopNav, { ContentGroup } from '../desktop-nav/desktop-nav';
import PrimaryDropdown from '../desktop-nav/primary-dropdown';
import ColumnDropdown from '../desktop-nav/column-dropdown';
import IconDropdown from '../desktop-nav/icon-dropdown';

class Navbar extends Component {
  render() {
    const {
      logo,
      primaryDropdown,
      columnDropdown,
      iconDropdown,
      links,
      authLink,
      mobileLinks,
      align,
      columnWidth,
      rowHeight,
      background,
      color,
      fontSize,
      fontFamily,
      contentBackground,
      contentColor,
      contentTop,
      breakpoint,
      debug
    } = this.props;
    return (
      <>
        <StyledNav>
          <h1>{logo}</h1>
          <MobileMenu
            primaryDropdown={primaryDropdown}
            mobileLinks={mobileLinks}
            authLink={authLink}
          />
        </StyledNav>
        <DesktopNav
          align={align}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          background={background}
          color={color}
          fontSize={fontSize}
          fontFamily={fontFamily}
          contentBackground={contentBackground}
          contentColor={contentColor}
          contentTop={contentTop}
          breakpoint={breakpoint}
          debug={debug}
        >
          <ContentGroup title={primaryDropdown.title} height="630" width="495">
            <PrimaryDropdown primaryDropdown={primaryDropdown} />
          </ContentGroup>
          <ContentGroup title={columnDropdown.title} height="408" width="400">
            <ColumnDropdown columnDropdown={columnDropdown} />
          </ContentGroup>
          <ContentGroup title={iconDropdown.title} height="442" width="420">
            <IconDropdown iconDropdown={iconDropdown} />
          </ContentGroup>
          <ContentGroup title="About" height="200">
            <ul>
              <li>Another list item</li>
              <li>Another list item</li>
              <li>Another list item</li>
              <li>Another list item</li>
              <li>Another list item</li>
              <li>Another list item</li>
            </ul>
          </ContentGroup>
          <ContentGroup title="Contact" height="200">
            <ul>
              <li>Another list item</li>
              <li>Another list item</li>
              <li>Another list item</li>
            </ul>
          </ContentGroup>
        </DesktopNav>
      </>
    );
  }
}

const linkWithoutIconProps = {
  link: PropTypes.object
};
const linkProps = {
  link: PropTypes.object,
  icon: PropTypes.string
};

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
  primaryDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({ ...linkProps, color: PropTypes.string.isRequired })),
    footerLink: PropTypes.shape(linkProps)
  }).isRequired,
  columnDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    primaryLink: PropTypes.shape({
      ...linkProps,
      subtitle: PropTypes.string.isRequired
    }).isRequired,
    firstColumn: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired
    }).isRequired,
    secondColumn: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps))
    }),
    footerLinks: PropTypes.arrayOf(PropTypes.shape(linkProps))
  }),
  iconDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape(linkProps)),
    footerTitle: PropTypes.shape(linkProps),
    footerLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps))
  }),
  links: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired,
  authLink: PropTypes.shape({
    link: PropTypes.object
  }).isRequired,
  mobileLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired,
  align: PropTypes.string,
  columnWidth: PropTypes.string,
  rowHeight: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontFamily: PropTypes.string,
  contentBackground: PropTypes.string,
  contentColor: PropTypes.string,
  contentTop: PropTypes.string,
  breakpoint: PropTypes.string,
  debug: PropTypes.bool
};

export default Navbar;
