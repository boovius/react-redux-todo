import React from 'react';
import FilterLink from '../containers/filter_link';

const Footer = ({
  onFilterLinkClick
}) => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>
    {', '}
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>
  </p>
)

export default Footer;
