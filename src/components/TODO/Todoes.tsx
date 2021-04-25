import React from "react";

import {useDispatch, useSelector} from "react-redux";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import CachedIcon from '@material-ui/icons/Cached';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress"
import Dialog from "@material-ui/core/Dialog";

import {todoesListSelector} from "../../Store/Todoes/reducers";
import {getTodoesList} from "../../Store/Todoes";

import {useStyles} from "./parts/styles";
import {TodoesList, TodoEditor} from "./parts";
import {EditorContextProvider} from "./parts/TodoEditorContext";


export const Todoes = () => {
  const classes = useStyles();

  const [todoInEditor, setTodoInEditor] = React.useState<number>();
  const onCloseEditor = React.useCallback(
    () => setTodoInEditor(undefined),
    []);

  const todoesList = useSelector(todoesListSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (todoesList.data === null) {
      dispatch(getTodoesList());
    }
  }, []);

  return (
    <React.Fragment>
      {(!todoesList.loading && todoesList.data) && (
        <TodoesList openTodoInEditor={setTodoInEditor}/>
      )}

      <Dialog
        open={todoInEditor !== undefined}
        onClose={() => setTodoInEditor(undefined)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <React.Fragment>
          {((todoInEditor !== undefined) && todoesList.data) && (
            <EditorContextProvider todo={todoesList.data[todoInEditor]}>
              <TodoEditor onClose={onCloseEditor}/>
            </EditorContextProvider>
          )}
        </React.Fragment>
      </Dialog>

      <Backdrop className={classes.backdrop} open={todoesList.loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>

      <Box position="fixed" bottom={20} right={20}>
        <Grid container spacing={2}>
          <Grid item>
            <Fab onClick={() => null}>
              <AddIcon/>
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" onClick={() => dispatch(getTodoesList())}>
              <CachedIcon/>
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
