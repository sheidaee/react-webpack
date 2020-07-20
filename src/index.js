import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import AppProviders from './AppProviders';

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<AppProviders />, wrapper) : false;
