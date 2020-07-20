import React from 'react';

import * as authDataProvider from '@modules/auth/utils/dataProvider/dataProvider';
import { bootstrapUserData } from '@modules/auth/utils/dataProvider/bootstrap';
import { useAsync } from '@utils/dataProvider/useAsync';
import Loading from '@components/Loading';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

// fetch user data
const appDataPromise = bootstrapUserData();

function AuthProvider(props) {
  const {
    data,
    status,
    error,
    isLoading,
    isIdle,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync();

  const login = React.useCallback(
    (form) => authDataProvider.login(form).then((user) => setData({ user })),
    [setData]
  );

  const logout = React.useCallback(() => {
    authDataProvider.logout();
    setData(null);
  }, [setData]);

  // get current user info
  React.useLayoutEffect(() => {
    run(appDataPromise);
  }, [run]);

  const user = data?.user;

  const value = React.useMemo(() => {
    return { user, login, logout };
  }, [user, login, logout]);

  if (isLoading || isIdle) {
    return <Loading />;
  }

  if (isError) {
    console.log({ error });
  }

  if (isSuccess) return <AuthContext.Provider value={value} {...props} />;

  throw new Error('auth context api');
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthProvider required');
  }

  return context;
}

export { AuthProvider, useAuth };
