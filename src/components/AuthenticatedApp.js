import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from '@components/Navigation';
import RouteList, { routes } from './RouteList/index';

const AuthenticatedApp = () => {
  return (
    <Router>
      <Navigation />
      <main>
        <RouteList routes={routes} />
      </main>
    </Router>
  );
};

export default AuthenticatedApp;
