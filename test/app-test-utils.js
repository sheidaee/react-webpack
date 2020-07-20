import React from 'react';
import * as rtl from '@testing-library/react';

import { AuthProvider } from '@modules/auth/utils/context/authContext';

jest.mock('@modules/auth/utils/context/authContext');

const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const render = (ui, options) =>
  rtl.render(ui, { wrapper: AppProviders, ...options });

// re-export everything
export * from '@testing-library/react';
export { render };
