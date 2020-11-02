import React, {Fragment, useState} from "react";
import clsx from 'clsx';

import {withRouter} from 'react-router-dom';

import {
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide,
  Breadcrumbs,
  Link,
  Typography
} from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import {Menu, ChevronLeft, ChevronRight, Event} from '@material-ui/icons';

import {makeStyles, useTheme} from '@material-ui/core/styles';

import {TheContent} from "./TheContent";
import {routes} from "../../settings/routes";
import {HOME_ROUTE, TODO_LIST_ROUTE} from "../../settings/routesPaths";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3, 0, 0, 10),
    },
  });
});

const TheLayoutComponent = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const classes = useStyles();
  const theme = useTheme();

  const trigger = useScrollTrigger();

  const breadcrumb = (item, idx) => {
    if ((item === "") && (idx === 0)) {

      return (
        <Link color="inherit" href={"#" + HOME_ROUTE} onClick={e => {
          e.preventDefault();
          props.history.push(HOME_ROUTE);
        }}>
          {routes.find(routeObj => routeObj.path === HOME_ROUTE).name}
        </Link>
      )
    } else {

      return (
        <Typography color="textPrimary">
          {routes.find(routeObj => routeObj.path === props.location.pathname).name}
        </Typography>
      )
    }
  };

  return (
    <Box>

      <ScopedCssBaseline/>

      <nav>
        <Slide appear={false} direction="down" in={!trigger}>
          <AppBar
            position="fixed"
            color="inherit"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: showMenu,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setShowMenu(true)}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: showMenu,
                })}
              >
                <Menu/>
              </IconButton>

              <Breadcrumbs>
                {
                  props.location.pathname.split("/")
                    .filter((item, idx) => (!((item === "") && (idx !== 0))))
                    .map(breadcrumb)
                }
              </Breadcrumbs>

            </Toolbar>
          </AppBar>
        </Slide>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: showMenu,
            [classes.drawerClose]: !showMenu,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: showMenu,
              [classes.drawerClose]: !showMenu,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => setShowMenu(!showMenu)}>
              {
                !showMenu ? (
                  theme.direction === 'rtl' ? <ChevronLeft/> : <ChevronRight/>
                ) : (
                  theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>
                )
              }
            </IconButton>
          </div>
          <List>
            <ListItem button onClick={() => props.history.push(TODO_LIST_ROUTE)}>
              <ListItemIcon>
                <Event/>
              </ListItemIcon>
              <ListItemText>
                TODO
              </ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </nav>


      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <TheContent/>
      </main>

    </Box>
  );
};


export const TheLayout = withRouter(TheLayoutComponent);