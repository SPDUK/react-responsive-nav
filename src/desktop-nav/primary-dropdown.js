import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import handleLinkClick from '../lib/handleLinkClick';

const StyledPrimaryDropdown = styled.div`
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
`;
const StyledPrimaryLink = styled.aside`
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  cursor: pointer;
  display: flex;
  height: 80px;
  img {
    height: 48px;
    width: 48px;
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

const StyledPrimaryLinks = styled.div`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
`;

const createPrimaryLink = ({ link, icon, color, text }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
        <span>{text}</span>
      </div>
    </StyledPrimaryLink>
  );
};

const StyledSecondaryLinks = styled.div`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
  background-color: rgb(246, 249, 252);
  border-bottom: 2px solid #fff;
`;

const StyledSecondaryLink = styled.div`
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
  }
  span {
    padding-top: 2px;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  padding: 18px 35px;
  font-size: 19px;
  font-weight: 700
  background-color: rgb(246, 249, 252);
  line-height: 50px;
  img {
    width: 17px;
    height: 17px;
    margin: auto 10px auto 0;
  }
`;

const createSecondaryLink = ({ link, icon, color, text }) => {
  const { href, to } = link.props;
  return (
    <StyledSecondaryLink key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <h5>{link}</h5>
      <span>{text}</span>
    </StyledSecondaryLink>
  );
};

const PrimaryDropdown = ({ primaryDropdown: { links, footerLink } }) => (
  <StyledPrimaryDropdown>
    <StyledPrimaryLinks>{links.slice(0, 3).map(createPrimaryLink)}</StyledPrimaryLinks>
    <StyledSecondaryLinks>{links.slice(3).map(createSecondaryLink)}</StyledSecondaryLinks>
    <StyledFooter>
      <img src={footerLink.icon} alt={footerLink.link} />
      {footerLink.link}
    </StyledFooter>
  </StyledPrimaryDropdown>
);

PrimaryDropdown.propTypes = {
  primaryDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.object,
        icon: PropTypes.string,
        color: PropTypes.string
      })
    ).isRequired,
    footerLink: PropTypes.shape({ icon: PropTypes.string, link: PropTypes.object }).isRequired
  })
};
export default PrimaryDropdown;
