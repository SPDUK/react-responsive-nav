import styled from 'styled-components';

export const StyledColumnDropdown = styled.div`
  height: 100%;
  padding-top: 10px;
  span {
    font-size: 14px;
    color: rgb(107, 124, 147);
  }
  // for some reason defaultProps isn't working correctly
  a {
    color: ${({ color }) => color || '#6772e5'};
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
  color: inherit;
  background: none;
  cursor: pointer;
  display: flex;
  height: 70px;
  img {
    height: 22px;
    width: 17px;
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

export const StyledFooter = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 18px 35px;
  font-size: 19px;
  font-weight: 700
  background-color: rgb(246, 249, 252);
  list-style-type: none;
  margin: 0;
  img {
    width: 17px;
    height: 22px;
    margin: 8.75px 10px 0 0;
  }
  li {
    height: 40px;
    line-height: 40px;
  }
`;

export const StyledColumnDropdownColumn = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 50%;
  height: 130px;
  list-style-type: none;
  margin: 0;
  padding: 0;

  span,
  a {
    margin: 2.5px 0;
    font-weight: 500;
    font-size: 14px;
  }
  span {
    font-weight: 600;
  }
`;

export const StyledColumnDropdownColumns = styled.div`
  margin: 0px 27px;
  display: flex;
  span {
    text-transform: uppercase;
  }
`;

export const StyledLinks = styled.div`
  padding: 20px 30px;
`;
