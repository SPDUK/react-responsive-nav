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

export const StyledClose = styled.a`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 50px;
  height: 50px;
  opacity: 1;
  &:hover {
    &:before,
    &:after {
      background-color: #424770;
    }
  }
  &:before,
  &:after {
    position: absolute;
    right: 20px;
    top: 5px;
    content: ' ';
    height: 24px;
    width: 4px;
    background-color: #6772e5;
    border-radius: 4px;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
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
    top: 10px;
    left: 10px;
    right: 10px;
    overflow: auto;
    transition: 0.2s ease-out;
    background: #fff;
    height: 300px;
    border-radius: 4px;
    padding: 20px 30px;
    -webkit-overflow-scrolling: touch;
    outline: none;
    z-index: 999999;
    -webkit-box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
      0 30px 60px -30px rgba(0, 0, 0, 0.3), 0 -18px 60px -10px rgba(0, 0, 0, 0.025);
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3),
      0 -18px 60px -10px rgba(0, 0, 0, 0.025);

    header {
      font-weight: 900;
      text-transform: uppercase;
      color: #8898aa;
      font-size: 13px;
    }
  }
`;

export const UnstyledButton = styled.button`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
`;

export const StyledPrimaryLinks = styled.div`
  display: flex;
`;
