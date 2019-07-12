import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const StyledPrimaryLinks = styled.div`
  padding: 20px 30px 0px 30px;
  display: flex;
  flex-direction: column;
  font-size: 19px;
  font-weight: 600;
`;

const createPrimaryLink = ({ link, icon }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
      </div>
    </StyledPrimaryLink>
  );
};

const StyledFooterLink = styled.div`
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

const StyledFooter = styled.div`
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

const createFooterLink = link => {
  const { href, to } = link.props;
  return (
    <StyledFooterLink key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <span>{link}</span>
    </StyledFooterLink>
  );
};

const StyledFooterTitle = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 20px;
  h5 {
    margin: 0 0 0 10px;
    line-height: 40px;
  }
`;

const createFooterTitle = ({ link, icon }) => {
  const { href, to } = link.props;
  return (
    <StyledFooterTitle key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={link} />
      <h5>{link}</h5>
    </StyledFooterTitle>
  );
};

const IconDropdown = ({ iconDropdown: { links, footerTitle, footerLinks } }) => (
  <StyledPrimaryDropdown>
    <StyledPrimaryLinks>{links.map(createPrimaryLink)}</StyledPrimaryLinks>
    <StyledFooter>
      {createFooterTitle(footerTitle)}
      {footerLinks.map(createFooterLink)}
    </StyledFooter>
  </StyledPrimaryDropdown>
);

IconDropdown.propTypes = {
  iconDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({ link: PropTypes.object, icon: PropTypes.string })),
    footerTitle: PropTypes.shape({ link: PropTypes.object, icon: PropTypes.string }),
    footerLinks: PropTypes.arrayOf(PropTypes.shape({ link: PropTypes.object }))
  })
};
export default IconDropdown;
