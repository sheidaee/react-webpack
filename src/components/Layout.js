import PropTypes from 'prop-types';
import React from 'react';

const Layout = ({ children }) => {
  return <div className="container">{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
