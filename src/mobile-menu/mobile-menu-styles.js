import styled from 'styled-components';

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
