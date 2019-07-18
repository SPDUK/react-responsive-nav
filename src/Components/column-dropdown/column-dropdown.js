import React from 'react';
import PropTypes from 'prop-types';
import handleLinkClick from '../../lib/handleLinkClick';

import {
  StyledColumnDropdown,
  StyledColumnDropdownColumn,
  StyledColumnDropdownColumns,
  StyledFooter,
  StyledLinks,
  StyledPrimaryLink
} from './column-dropdown-styles';

const createPrimaryDropdownLink = ({ link, icon, subtitle }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={href || to} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
        <span>{subtitle}</span>
      </div>
    </StyledPrimaryLink>
  );
};

const createFooterLink = ({ link, icon }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={href || to} onClick={() => handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
      </div>
    </StyledPrimaryLink>
  );
};

const createColumnLink = link => {
  const { href, to } = link.props;
  return (
    <li
      type="link"
      role="link"
      tabIndex={-1}
      onKeyPress={() => handleLinkClick(href, to)}
      key={href || to}
      onClick={() => handleLinkClick(href, to)}
    >
      {link}
    </li>
  );
};

const ColumnDropdown = ({
  columnDropdown: { primaryLink, firstColumn, secondColumn, footerLinks, color }
}) => (
  <StyledColumnDropdown color={color}>
    <StyledLinks>
      {createPrimaryDropdownLink(primaryLink)}
      <StyledColumnDropdownColumns>
        <StyledColumnDropdownColumn>
          <span>{firstColumn.title}</span>
          {firstColumn.links.map(createColumnLink)}
        </StyledColumnDropdownColumn>
        <StyledColumnDropdownColumn>
          <span>{secondColumn.title}</span>
          {secondColumn.links.map(createColumnLink)}
        </StyledColumnDropdownColumn>
      </StyledColumnDropdownColumns>
    </StyledLinks>
    <StyledFooter>{footerLinks.map(createFooterLink)}</StyledFooter>
  </StyledColumnDropdown>
);

ColumnDropdown.propTypes = {
  columnDropdown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    primaryLink: PropTypes.shape({
      link: PropTypes.object,
      icon: PropTypes.string,
      subtitle: PropTypes.string.isRequired
    }).isRequired,
    firstColumn: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape({ link: PropTypes.object })).isRequired
    }).isRequired,
    secondColumn: PropTypes.shape({
      title: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(PropTypes.shape({ link: PropTypes.object }))
    }),
    footerLinks: PropTypes.arrayOf(
      PropTypes.shape({ link: PropTypes.object, icon: PropTypes.string })
    )
  })
};

export default ColumnDropdown;
