import styled from 'styled-components';

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  color: black;
  top: 0;
  left: 0;
  position: absolute;
  height: 60px;
  a {
    margin: 0 0 0 20px;
    color: #fff;
    line-height: 60px;
    font-size: 24px;
    text-decoration: none;
    z-index: 99999;
    font-weight: 700;
  }
`;
