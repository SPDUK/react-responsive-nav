import styled from 'styled-components';

export const StyledPrimaryDropdown = styled.div`
  height: 100%;
  padding-top: 10px;
  span {
    font-size: 14px;
    color: rgb(107, 124, 147);
  }
  a {
    color: ${({ color }) => color || '#6772e5'};
    text-decoration: none;
  }
`;
export const StyledPrimaryLink = styled.aside`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  display: flex;
  height: 40px;
  img {
    height: 17px;
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

export const StyledPrimaryLinks = styled.div`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
`;

export const StyledFooterLink = styled.div`
  display: flex;
  height: 32px;
  font-weight: 400;
  span {
    width: 100%;
    font-size: 15px;
    margin: 0 0 0 27px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;
  padding: 20px 35px;
  font-size: 19px;
  background-color: rgb(246, 249, 252);
  img {
    width: 17px;
    height: 17px;
    display: inline-block;
    height: 100%;
    vertical-aling: middle;
  }
`;

export const StyledFooterTitle = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 20px;
  h5 {
    margin: 0 0 0 10px;
    line-height: 40px;
  }
`;
