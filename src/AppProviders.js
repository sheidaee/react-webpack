import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import { ReactQueryConfigProvider } from 'react-query';

import { AuthProvider } from '@modules/auth/utils/context/authContext';
import App from './App';

import './styles/main.less';

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
  },
  mutations: {
    useErrorBoundary: true,
  },
};

const AppProviders = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ReactQueryConfigProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.any,
};

export default hot(AppProviders);
