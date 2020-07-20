import React from 'react';
import loading from './loading.svg';

import './styles.less';

const Loading = () => (
  <div className="spinner" data-testid="loading">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
