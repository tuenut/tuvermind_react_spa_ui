import React from 'react';

import clsx from "clsx";

import {Typography, Slide, AppBar, Toolbar, IconButton, Breadcrumbs, Link, Divider} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useScrollTrigger, withStyles} from "@material-ui/core/index";

import {HOME_ROUTE} from "../../settings/routesPaths";
import {routes} from "../../settings/routes";
import {useHeadbarStyles} from "../../settings/styles";


const LinkBreadcrumb = withStyles((theme) => ({
  root: {
    '&:hover': {
      color: theme.palette.grey.A100
    },
    color: theme.palette.primary.light
  },
}))(Link);
const CurrentBreadcrumb = withStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText
  }
}))(Typography);

const homePageText = routes.find(routeObj => routeObj.path === HOME_ROUTE).name;

export const HeadBar = ({showMenu, setShowMenu, ...props}) => {
  const classes = useHeadbarStyles();
  const appBarClasses = clsx(classes.appBar, {[classes.appBarShift]: showMenu,});
  const menuButtonClasses = clsx(classes.menuButton, {[classes.hide]: showMenu,});

  const trigger = useScrollTrigger();

  const currentPageText = routes.find(routeObj => routeObj.path === props.location.pathname).name;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" className={appBarClasses}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setShowMenu(true)}
            edge="start"
            className={menuButtonClasses}
          >
            <Menu/>
          </IconButton>

          <Divider
            flexItem
            light
            orientation="vertical"
            className={menuButtonClasses}
          />

          <Breadcrumbs className={clsx(classes.separator)}>
            {
              props.location.pathname !== HOME_ROUTE &&
              <LinkBreadcrumb
                href={"#" + HOME_ROUTE}
                onClick={e => {
                  e.preventDefault();
                  props.history.push(HOME_ROUTE);
                }}
              >
                {homePageText}
              </LinkBreadcrumb>
            }
            <CurrentBreadcrumb color="textPrimary">
              {currentPageText}
            </CurrentBreadcrumb>
          </Breadcrumbs>

        </Toolbar>
      </AppBar>
    </Slide>
  )
};