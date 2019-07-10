import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { StyledNav } from './navbar-styles';
import MobileMenu from '../mobile-menu/mobile-menu';

class Navbar extends Component {
  render() {
    const {
      logo,
      primaryDropdown,
      columnDropdown,
      iconDropdown,
      links,
      authLink,
      mobileLinks
    } = this.props;
    return (
      <StyledNav>
        <h1>{logo}</h1>
        <MobileMenu
          primaryDropdown={primaryDropdown}
          mobileLinks={mobileLinks}
          authLink={authLink}
        />
      </StyledNav>
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
    footerTitle: linkProps,
    footerLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps))
  }),
  links: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired,
  authLink: PropTypes.shape({
    link: PropTypes.object
  }).isRequired,
  mobileLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired
};

export default Navbar;
