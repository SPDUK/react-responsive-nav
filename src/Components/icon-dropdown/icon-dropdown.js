import React from 'react';
import PropTypes from 'prop-types';
import handleLinkClick from '../../lib/handleLinkClick';
import {
  StyledFooter,
  StyledFooterLink,
  StyledFooterTitle,
  StyledPrimaryDropdown,
  StyledPrimaryLink,
  StyledPrimaryLinks
} from './icon-dropdown-styles';

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

const createFooterLink = link => {
  const { href, to } = link.props;
  return (
    <StyledFooterLink key={Math.random()} onClick={() => handleLinkClick(href, to)}>
      <span>{link}</span>
    </StyledFooterLink>
  );
};

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