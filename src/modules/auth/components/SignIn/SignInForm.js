import React, { useReducer } from 'react';

import { useAsync } from '@utils/dataProvider/useAsync';
import { useAuth } from '@modules/auth/utils/context/authContext';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function reducer(state, action) {
  if (typeof action === 'function') {
    return action(state);
  }

  return { ...state, ...action };
}

const initialState = {
  email: '',
  password: '',
  messages: [],
};

const SignInForm = ({ onSubmit }) => {
  const [{ email, password, messages }, setState] = useReducer(
    reducer,
    initialState
  );
  const { run, data, error, isLoading, isError, isSuccess } = useAsync();
  const { login } = useAuth();

  const handleChange = (e) => {
    const target = e.target;

    setState({ [target.id]: target.value });
  };

  const validateForm = ({ email, password }) => {
    let errors = [];
    if (!email) {
      errors.push('Please enter your email');
    } else if (!validateEmail(email)) {
      errors.push('Please enter a valid email');
    }

    if (!password) {
      errors.push('Please enter your password');
    }

    if (errors.length) {
      setState({ messages: errors });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm({ email, password })) {
      return;
    }

    run(login({ email, password }));
    onSubmit();
  };

  return (
    <>
      <div className="form-container__messages">
        {messages.map((messageItem, i) => (
          <li key={i}>{messageItem}</li>
        ))}
      </div>
      <form action="/" onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">
            <span>Email:</span>
            <input
              type="text"
              id="email"
              onChange={handleChange}
              value={email}
              autoFocus
              data-testid="email"
            />
          </label>

          <label htmlFor="password">
            <span>Password:</span>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={password}
              data-testid="password"
            />
          </label>
          <input
            type="submit"
            value={`Sign in ${isLoading ? '...' : ''}`}
            data-testid="loginbtn"
          />
        </fieldset>
      </form>
    </>
  );
};

export default SignInForm;
