import React, {useState} from "react";

import {withRouter} from 'react-router-dom';

import {Box} from '@material-ui/core';

import {useHeadbarStyles} from "../../settings/styles";
import {TheContent} from "./TheContent";
import {HeadBar} from "./Headbar";
import {SideBar} from "./Sidebar";

const TheLayoutComponent = (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const classes = useHeadbarStyles();

  return (
    <Box>
      <HeadBar {...props} showMenu={showMenu} setShowMenu={setShowMenu}/>
      <SideBar {...props} showMenu={showMenu} setShowMenu={setShowMenu}/>


      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <TheContent/>
      </main>

    </Box>
  );
};


export const TheLayout = withRouter(TheLayoutComponent);