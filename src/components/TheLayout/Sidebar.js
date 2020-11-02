import React from 'react';

import clsx from "clsx";

import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import {Event, ChevronRight, ChevronLeft} from '@material-ui/icons';
import {useTheme} from "@material-ui/core/styles/index";

import {useHeadbarStyles} from "../../settings/styles";
import {TODO_LIST_ROUTE} from "../../settings/routesPaths";


export const SideBar = ({showMenu, setShowMenu, ...props}) => {
  const classes = useHeadbarStyles();
  const theme = useTheme();

  return (
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

      <Divider/>

      <List className={classes.menuIcons}>
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
  )
};