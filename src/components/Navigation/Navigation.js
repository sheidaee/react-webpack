import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@modules/auth/utils/context/authContext';

import './styles.less';

const Navigation = (props) => {
  const { logout } = useAuth();

  return (
    <div className="header">
      <ul className="nav nav-pills">
        <li>
          <Link to="/">Home</Link>
        </li>
        <button onClick={logout}> Log out</button>
      </ul>
    </div>
  );
};

export default Navigation;
