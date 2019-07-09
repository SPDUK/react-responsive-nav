import React from 'react';
import PropTypes from 'prop-types';
import { StyledCard } from './card-styles';

const card = ({ children }) => <StyledCard>{children}</StyledCard>;

card.propTypes = {
  children: PropTypes.node.isRequired
};
export default card;
