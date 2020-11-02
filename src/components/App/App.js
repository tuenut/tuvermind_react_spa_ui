import React, {Suspense} from 'react';

import {HashRouter, Route, Switch} from 'react-router-dom';

// import {CssBaseline} from '@material-ui/core';

import {HOME_ROUTE} from "../../settings/routesPaths";
import {LoadingSpinner} from "../_lib";


const TheLayout = React.lazy(() => import("../TheLayout"));

export const App = () => (
  <HashRouter>

    {/*<CssBaseline/>*/}

    <Suspense fallback={<LoadingSpinner/>}>
      <Switch>
        <Route path={HOME_ROUTE} name={"Home"} render={props => <TheLayout/>}/>
      </Switch>
    </Suspense>

  </HashRouter>
);
