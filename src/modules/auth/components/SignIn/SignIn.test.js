import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  act,
} from 'app-test-utils';

import SignIn from './SignIn';

test('if user does not input username and password handle submit is not called', async () => {
  const promise = Promise.resolve();

  const handleSubmit = jest.fn();
  const { getByTestId } = render(<SignIn onSubmit={handleSubmit} />);

  // since we mock authContext there is no loading in the page
  // await waitForElementToBeRemoved(() => getByTestId(/loading/i), {
  //   timeout: 4000,
  // });

  const loginBtn = getByTestId(/loginbtn/i);

  expect(getByTestId('email')).toBeInTheDocument();
  expect(getByTestId('password')).toBeInTheDocument();

  expect(loginBtn).toBeInTheDocument();

  fireEvent.click(loginBtn);

  expect(handleSubmit).toHaveBeenCalledTimes(0);

  await act(() => promise);
});

test('if user inputs email and password handle submit is called', async () => {});
