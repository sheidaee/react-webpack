import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import GalleryList from '@modules/gallery/components/GalleryList';

const routes = [
  {
    path: '/',
    component: GalleryList,
    exact: true,
  },
];

const RouteList = ({ routes }) => (
  <Switch>
    {routes.map(({ path, component, exact }) => (
      <Route key={path} path={path} component={component} exact={exact} />
    ))}
  </Switch>
);

RouteList.propTypes = {
  routes: PropTypes.any,
};

export default RouteList;

export { routes };
