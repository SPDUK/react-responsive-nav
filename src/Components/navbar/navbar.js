import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { StyledNav } from './navbar-styles';
import MobileMenu from '../mobile-menu/mobile-menu';
import DesktopNav from '../desktop-nav/desktop-nav';

class Navbar extends Component {
  render() {
    const {
      logo,
      primaryDropdown,
      mobileFooterLinks,
      mobileLinks,
      align,
      columnWidth,
      rowHeight,
      background,
      color,
      contentBackground,
      contentColor,
      contentTop,
      breakpoint,
      debug,
      children
    } = this.props;
    return (
      <>
        <StyledNav>
          <a href="/">{logo}</a>
          <MobileMenu
            primaryDropdown={primaryDropdown}
            mobileLinks={mobileLinks}
            mobileFooterLinks={mobileFooterLinks}
            breakpoint={breakpoint}
          />
        </StyledNav>
        <DesktopNav
          align={align}
          columnWidth={columnWidth}
          rowHeight={rowHeight}
          background={background}
          color={color}
          contentBackground={contentBackground}
          contentColor={contentColor}
          contentTop={contentTop}
          breakpoint={breakpoint}
          debug={debug}
        >
          {children}
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
  mobileFooterLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object
    })
  ).isRequired,
  mobileLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired,
  align: PropTypes.string,
  columnWidth: PropTypes.string,
  rowHeight: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  contentBackground: PropTypes.string,
  contentColor: PropTypes.string,
  contentTop: PropTypes.string,
  breakpoint: PropTypes.number,
  debug: PropTypes.bool
};

export default Navbar;
