import React from 'react';

import Layout from './components/Layout';
import { useAuth } from '@modules/auth/utils/context/authContext';

const AuthenticatedApp = React.lazy(() =>
  import(
    /* webpackChunkName: "AuthenticatedApp" */ /* webpackPrefetch: true */ '@components/AuthenticatedApp'
  )
);
const UnAuthenticatedApp = React.lazy(() =>
  import(
    /* webpackChunkName: "UnauthenticatedApp" */ '@components/UnAuthenticatedApp'
  )
);

const App = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <React.Suspense fallback={<div>Loading</div>}>
        {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </React.Suspense>
    </Layout>
  );
};

export default App;
