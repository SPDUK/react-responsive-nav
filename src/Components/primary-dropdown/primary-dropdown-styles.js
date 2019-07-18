import styled from 'styled-components';

export const StyledPrimaryDropdown = styled.div`
  height: 100%;
  padding-top: 10px;
  span {
    font-size: 14px;
    color: rgb(107, 124, 147);
  }
  a {
    color: #6772e5;
    text-decoration: none;
  }
  li {
    transition: filter 0.1s ease-out;
    &: hover {
      filter: grayscale(90%) brightness(50%);
    }
    cursor: pointer;
  }
`;
export const StyledPrimaryLink = styled.li`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  background: none;
  cursor: pointer;
  display: flex;
  height: 80px;
  img {
    height: 48px;
    width: 48px;
  }
  a {
    color: ${({ color }) => color};
  }
  div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    h4 {
      margin: 0;
      font-size: 16px;
      text-transform: uppercase;
    }
  }
`;

export const StyledPrimaryLinks = styled.ul`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
  list-style-type: none;
  margin: 0;
`;

export const StyledSecondaryLinks = styled.ul`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
  background-color: rgb(246, 249, 252);
  border-bottom: 2px solid #fff;
  list-style-type: none;
  margin: 0;
`;

export const StyledSecondaryLink = styled.li`
  display: flex;
  height: 50px;
  flex-direction: row;
  font-size: 19px;
  font-weight: 600;
  img {
    width: 24px;
    height: 24px;
  }
  h5 {
    font-size: 16px;
    margin: 0px 10px;
    a {
      color: ${({ color }) => color};
    }
  }
  span {
    padding-top: 2px;
  }
`;

export const StyledFooter = styled.ul`
  height: 50px;
  padding: 18px 35px;
  font-size: 19px;
  font-weight: 700
  background-color: rgb(246, 249, 252);
  line-height: 50px;
  list-style-type: none;
  margin: 0;
  img {
    width: 17px;
    height: 17px;
    margin: auto 10px auto 0;
  }
  a {
    font-size: 16px;
  }
  li {
    display: flex;
    justify-content: center;
  }
`;
