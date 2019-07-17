import React from 'react';
import PropTypes from 'prop-types';
import handleLinkClick from '../../lib/handleLinkClick';
import {
  StyledFooter,
  StyledPrimaryDropdown,
  StyledPrimaryLink,
  StyledPrimaryLinks,
  StyledSecondaryLink,
  StyledSecondaryLinks
} from './primary-dropdown-styles';

const createPrimaryLink = ({ link, icon, color, text }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink color={color} key={href || to} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
        <span>{text}</span>
      </div>
    </StyledPrimaryLink>
  );
};

const createSecondaryLink = ({ link, icon, color, text }) => {
  const { href, to } = link.props;
  return (
    <StyledSecondaryLink color={color} key={href || to} onClick={() => handleLinkClick(href, to)}>
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
      <div>{footerLink.link}</div>
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
        color: PropTypes.string,
        text: PropTypes.string
      })
    ).isRequired,
    footerLink: PropTypes.shape({ icon: PropTypes.string, link: PropTypes.object }).isRequired
  })
};
export default PrimaryDropdown;
