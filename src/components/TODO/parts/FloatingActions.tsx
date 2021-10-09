import React from "react";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { openEditorToCreateNewTodoAction, useEditorContext } from "./TodoEditor/TodoEditorContext";

export const FloatingActions = () => {
  const {dispatch, setIsEditorOpen} = useEditorContext();

  const createNew = React.useCallback(() => {
    setIsEditorOpen(true);
    dispatch(openEditorToCreateNewTodoAction());
  }, []);

  return (
    <Box position="fixed" bottom={20} right={20}>
      <Grid container spacing={2}>
        <Grid item>

          <Fab onClick={createNew}>
            <AddIcon/>
          </Fab>

        </Grid>
      </Grid>
    </Box>
  )
};