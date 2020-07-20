import { endpoints } from '@modules/auth/utils/endpoints';

import {
  dataProvider,
  localStorageKey,
} from '@utils/dataProvider/dataProvider';

function handleUserResponse({ token, ...user }) {
  localStorage.setItem(localStorageKey.token, token);
  return user;
}

function login({ email, password }) {
  return dataProvider(endpoints.login, { body: { email, password } }).then(
    handleUserResponse
  );
}

function logout() {
  localStorage.removeItem(localStorageKey.token);
}

function isLoggedIn() {
  const isUser = localStorage.getItem(localStorageKey.token);

  return Boolean(isUser);
}

function getUser() {
  const token = localStorage.getItem(localStorageKey.token);

  if (!token) {
    return Promise.resolve(null);
  }
  return dataProvider(endpoints.getUser).then((data) => data?.user);
}

export { login, isLoggedIn, getUser, logout };
