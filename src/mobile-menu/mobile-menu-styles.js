import styled from 'styled-components';
import React from 'react';

import Modal from 'react-modal';

export const StyledMobileMenu = styled.button`
  background: none;
  outline: none;
  border: none;
  height: 50px;
  width: 49px;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    display: block;
    width: 24px;
    height: 3px;
    background: white;
    border-radius: 1px;
    &:nth-child(1) {
    }
    &:nth-child(2) {
      margin-top: 6px;
    }
    &:nth-child(3) {
      margin-top: 6px;
    }
  }
`;

function ReactModalAdapter({ className, ...props }) {
  const contentClassName = `${className}__content`;
  const overlayClassName = `${className}__overlay`;
  return (
    <Modal
      portalClassName={className}
      className={contentClassName}
      overlayClassName={overlayClassName}
      {...props}
    />
  );
}

export const StyledModal = styled(ReactModalAdapter)`
  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0);
    z-index: 99999;
  }

  &__content {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
    border: 1px solid #ccc;
    background: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    borderradius: 4px;
    outline: none;
    padding: 20px;
    z-index: 999999;
  }
`;
