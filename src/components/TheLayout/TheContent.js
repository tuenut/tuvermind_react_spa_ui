import React, {Suspense} from "react";
import {Redirect, Route, Switch} from 'react-router-dom';

import {Container} from "react-bootstrap";

import {routes} from "../../settings/routes";


export const TheContent = () => (
  <Suspense>
    <Switch>

      {routes.map((route, index) => (
        route.component && (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => <route.component {...props}/>}
          />
        )
      ))}

    </Switch>
  </Suspense>
);
