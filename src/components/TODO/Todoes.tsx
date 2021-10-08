import React from "react";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress"

import { FloatingActions, TodoEditorDialog, TodoesList, useStyles } from "./parts";

import { useTodoList } from "../../libs/swrHooks";
import { EditorContextProvider } from "./parts/TodoEditor/TodoEditorContext";


export const Todoes = () => {
  const classes = useStyles();

  const {data, error, isValidating} = useTodoList();

  return (
    <React.Fragment>

      <EditorContextProvider>
        {data && <TodoesList/>}

        <TodoEditorDialog/>

        <Backdrop className={classes.backdrop} open={!data && !error}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <FloatingActions/>

      </EditorContextProvider>
    </React.Fragment>
  );
};
