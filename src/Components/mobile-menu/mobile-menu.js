import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import handleLinkClick from '../../lib/handleLinkClick';
import {
  StyledMobileMenu,
  StyledModal,
  StyledClose,
  StyledPrimaryLinks,
  StyledPrimaryLink,
  StyledMobileLinks
} from './mobile-menu-styles';

Modal.setAppElement('#root');

const defaultBreakpoint = 670;

class MobileMenu extends Component {
  state = {
    modalIsOpen: false
  };

  static defaultProps = {
    breakpoint: defaultBreakpoint
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {};

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  createPrimaryLink = ({ link, icon, color }) => {
    const { href, to } = link.props;
    return (
      <StyledPrimaryLink color={color} key={href || to} onClick={() => handleLinkClick(href, to)}>
        <img src={icon} alt={icon} />
        {link}
      </StyledPrimaryLink>
    );
  };

  createMobileLink = link => {
    const { href, to } = link.props;
    return (
      <StyledPrimaryLink onClick={() => handleLinkClick(href, to)} key={href || to}>
        {link}
      </StyledPrimaryLink>
    );
  };

  render() {
    const { modalIsOpen } = this.state;
    const { primaryDropdown, mobileLinks, mobileFooterLinks, breakpoint } = this.props;
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
          <footer>{mobileFooterLinks.map(this.createMobileLink)}</footer>
        </StyledModal>
        <StyledMobileMenu breakpoint={breakpoint} onClick={this.openModal}>
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
  mobileFooterLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object
    })
  ).isRequired,
  mobileLinks: PropTypes.arrayOf(PropTypes.shape(linkWithoutIconProps)).isRequired,
  breakpoint: PropTypes.number
};

export default MobileMenu;
