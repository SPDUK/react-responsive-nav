import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContentGroup } from './desktop-nav';

const StyledColumnDropdown = styled.div`
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
  height: 70px;
  img {
    margin-top: 5px;
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

const createPrimaryDropdownLink = ({ link, icon, subtitle }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={Math.random()} onClick={() => this.handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
        <span>{subtitle}</span>
      </div>
    </StyledPrimaryLink>
  );
};

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 35px;
  font-size: 19px;
  font-weight: 700
  background-color: rgb(246, 249, 252);
  img {
    width: 17px;
    height: 17px;
    margin: 8.75px 10px 0 0;
  }
  aside {
    height: 40px;
    line-height: 40px;
  }
`;

const createFooterLink = ({ link, icon }) => {
  const { href, to } = link.props;
  return (
    <StyledPrimaryLink key={Math.random()} onClick={() => this.handleLinkClick(href, to)}>
      <img src={icon} alt={icon} />
      <div>
        <h4>{link}</h4>
      </div>
    </StyledPrimaryLink>
  );
};

const StyledColumnDropdownColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  height: 130px;
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

const StyledColumnDropdownColumns = styled.div`
  margin: 0px 27px;
  display: flex;
  span {
    text-transform: uppercase;
  }
`;

const StyledLinks = styled.div`
  padding: 20px 30px;
`;

const createColumnLink = link => {
  const { href, to } = link.props;
  return (
    <div
      type="link"
      role="link"
      tabIndex={-1}
      onKeyDown={() => this.handleLinkClick(href, to)}
      key={Math.random()}
      onClick={() => this.handleLinkClick(href, to)}
    >
      {link}
    </div>
  );
};

const ColumnDropdown = ({
  columnDropdown: { primaryLink, firstColumn, secondColumn, footerLinks }
}) => (
  <StyledColumnDropdown>
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
