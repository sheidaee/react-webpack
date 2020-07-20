import React from 'react';

import SignInForm from '@modules/auth/components/SignIn/SignInForm';

const SignIn = (props) => {
  const onSubmit = () => {
    console.log('submit');
  };
  return (
    <div className="sign-in-container">
      <div className="sign-in">
        <div className="sign-in__description"></div>
        <div className="sign-in__form-container">
          <div className="form-container__logo"></div>
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
