import React from "react";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress"

import { FloatingActions, TodoEditorDialog, TodoesList, useStyles } from "./parts";
import { TodoesListContextProvider } from "./parts/Context";
import { useTodoList } from "../../libs/swrHooks";


export const Todoes = () => {
  const classes = useStyles();

  const {data, error, isValidating} = useTodoList();

  return (
    <React.Fragment>
      <TodoesListContextProvider>
        {data && <TodoesList/>}

        <TodoEditorDialog/>

        <Backdrop className={classes.backdrop} open={!data && !error}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <FloatingActions/>

      </TodoesListContextProvider>
    </React.Fragment>
  );
};
