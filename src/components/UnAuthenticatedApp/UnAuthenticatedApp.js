import React from 'react';
import PropTypes from 'prop-types';
import SignIn from '@modules/auth/components/SignIn';

import './styles.less';

const UnAuthenticatedApp = (props) => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

UnAuthenticatedApp.propTypes = {
  // bla: PropTypes.string,
};

export default UnAuthenticatedApp;
