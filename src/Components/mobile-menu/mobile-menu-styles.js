import styled from 'styled-components';
import React from 'react';

import Modal from 'react-modal';

export const StyledMobileMenu = styled.button`
  background: none;
  outline: none;
  border: none;
  height: 60px;
  width: 49px;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
  span {
    display: block;
    width: 24px;
    height: 3px;
    background: white;
    border-radius: 1px;
    &:nth-child(2) {
      margin-top: 6px;
    }
    &:nth-child(3) {
      margin-top: 6px;
    }
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    display: none;
  }
`;

export const StyledClose = styled.a`
  position: fixed;
  right: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  opacity: 1;
  cursor: pointer;
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
    top: 10px;
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
    transition: 0.15s ease-out;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0);
    z-index: 99999;
    height: 100%;
    opacity: 0;
    transform: scale(0.95) translate(15px, -15px);
    &.ReactModal__Overlay--after-open {
      opacity: 1;
      transform: scale(1) translate(0px, 0px);
    }
    &.ReactModal__Overlay--before-close {
      transform: scale(0.95) translate(15px, -15px);
      opacity: 0;
    }
  }

  &__content {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    overflow-y: auto;
    max-height: 90%;
    transition: 0.2s ease-out;
    background: #fff;
    border-radius: 4px;
    padding-top: 20px;
    -webkit-overflow-scrolling: touch;
    outline: none;
    z-index: 999999;
    -webkit-box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25),
      0 30px 60px -30px rgba(0, 0, 0, 0.3), 0 -18px 60px -10px rgba(0, 0, 0, 0.025);
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3),
      0 -18px 60px -10px rgba(0, 0, 0, 0.025);
    a {
      text-decoration: none;
    }
    header {
      padding-left: 25px;
      font-weight: 900;
      text-transform: uppercase;
      color: #8898aa;
      font-size: 13px;
    }

    ul li {
      transition: filter 0.1s ease-out;
      &:hover {
        filter: grayscale(90%) brightness(50%);
      }
      cursor: pointer;
    }

    footer {
      font-weight: 800;
      background-color: #f6f9fc;
      height: 40px;
      line-height: 40px;
      padding: 12px 30px;
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
`;

export const StyledPrimaryLink = styled.li`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  background: none;
  cursor: pointer;
  a {
    color: ${({ color }) => color || 'rgb(103, 114, 229)'};
  }
`;

export const StyledPrimaryLinks = styled.ul`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgb(246, 249, 252);
  font-size: 19px;
  font-weight: 600;
  list-style-type: none;
  margin: 0;
  li {
    display: flex;
    justify-content: flex-start;
    height: 50px;
    img {
      width: 26px;
      height: 26px;
      margin-right: 10px;
    }
  }
  @media (min-width: 350px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(100% - 60px);
    li {
      flex: 50%;
    }
  }
`;
export const StyledMobileLinks = styled.ul`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  line-height: 40px;
  list-style-type: none;
  margin: 0;
  @media (min-width: 360px) {
    flex-direction: row;
    flex-wrap: wrap;
    width: calc(100% - 60px);
    li {
      flex: 50%;
    }
  }
`;
