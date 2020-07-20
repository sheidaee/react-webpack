import React from 'react';

const MockAuthContext = React.createContext();
MockAuthContext.displayName = 'MockAuthContext';

const mockValue = {
  login: jest.fn().mockRejectedValue(),
  logout: jest.fn(),
};

function MockAuthProvider(props) {
  return <MockAuthContext.Provider value={mockValue} {...props} />;
}

function useMockAuth() {
  const context = React.useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('AuthProvider required');
  }
  return context;
}

export { MockAuthProvider as AuthProvider, useMockAuth as useAuth };
