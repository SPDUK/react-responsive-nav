import React, { Component } from 'react';
import Modal from 'react-modal';
import { StyledMobileMenu, StyledModal } from './mobile-menu-styles';

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

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <StyledModal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
          modalClassname="Overlay"
        >
          <h2>Hello</h2>
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

export default MobileMenu;
