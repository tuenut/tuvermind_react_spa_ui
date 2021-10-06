import React from "react";

import { useDispatch } from "react-redux";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';

import { TODO_OPEN_EDITOR, useTodoesListContext } from "./Context";
import { actions } from "../../../Store/__DEPRECATED__Todoes";


export const FloatingActions = () => {
  const reduxDispatch = useDispatch();

  const [, localDispatch] = useTodoesListContext();

  const createNew = React.useCallback(
    () => localDispatch({type: TODO_OPEN_EDITOR, todo: null}),
    [localDispatch]
  );

  const updateList = React.useCallback(
    () => reduxDispatch(actions.GET_LIST()),
    [reduxDispatch]
  );

  return (
    <Box position="fixed" bottom={20} right={20}>
      <Grid container spacing={2}>
        <Grid item>
          <Fab onClick={createNew}>
            <AddIcon/>
          </Fab>
        </Grid>

        <Grid item>
          <Fab color="primary" onClick={updateList}>
            <CachedIcon/>
          </Fab>
        </Grid>
      </Grid>
    </Box>
  )
}