import React, { Component } from 'react';
import { StyledNav } from './navbar-styles';
import MobileMenu from '../mobile-menu/mobile-menu';

class Navbar extends Component {
  render() {
    const {
      title,
      primaryDropdown,
      columnDropdown,
      iconDropdown,
      authLink,
      mobileLinks
    } = this.props;
    return (
      <StyledNav>
        <h1>{title}</h1>
        <MobileMenu
          primaryDropdown={primaryDropdown}
          mobileLinks={mobileLinks}
          authLink={authLink}
        />
      </StyledNav>
    );
  }
}
export default Navbar;
