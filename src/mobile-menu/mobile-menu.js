import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

import {
  StyledMobileMenu,
  StyledModal,
  StyledClose,
  StyledPrimaryLinks,
  StyledPrimaryLink,
  StyledMobileLinks
} from './mobile-menu-styles';

const history = createBrowserHistory();

Modal.setAppElement('#root');

class MobileMenu extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {};

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // if an anchor tag is uses, redirect on click
  // else push to history so we use react router
  handleLinkClick = (href, to) => {
    if (href) window.location.href = href;
    else history.push(to);
  };

  createPrimaryLink = ({ link, icon, color }) => {
    const { href, to } = link.props;
    return (
      <StyledPrimaryLink key={Math.random()} onClick={() => this.handleLinkClick(href, to)}>
        <img src={icon} alt={icon} />
        {link}
      </StyledPrimaryLink>
    );
  };

  createMobileLink = link => {
    const { href, to } = link.props;
    return (
      <StyledPrimaryLink onClick={() => this.handleLinkClick(href, to)} key={Math.random()}>
        {link}
      </StyledPrimaryLink>
    );
  };

  render() {
    const { modalIsOpen } = this.state;
    const { primaryDropdown, mobileLinks, authLink } = this.props;
    return (
      <>
        <StyledModal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
          modalClassname="Overlay"
          closeTimeoutMS={150}
        >
          <StyledClose onClick={this.closeModal} />
          <header>{primaryDropdown.title}</header>
          <StyledPrimaryLinks>
            {primaryDropdown.links.map(this.createPrimaryLink)}
          </StyledPrimaryLinks>
          <StyledMobileLinks>{mobileLinks.map(this.createMobileLink)}</StyledMobileLinks>
          <footer>{authLink}</footer>
        </StyledModal>
        <StyledMobileMenu onClick={this.openModal}>
          <span />
          <span />
          <span />
        </StyledMobileMenu>
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

MobileMenu.propTypes = {
  primaryDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({ ...linkProps, color: PropTypes.string.isRequired })),
    footerLink: PropTypes.shape(linkProps)
  }).isRequired,
  authLink: PropTypes.shape({
    link: PropTypes.object
  }).isRequired,
  mobileLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired
};

export default MobileMenu;
