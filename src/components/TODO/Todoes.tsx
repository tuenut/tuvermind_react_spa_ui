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

import {convertStoreObjectToArray} from "../../libs/common";

import {actions, todoesListSelector} from "../../Store/Todoes";

import {useStyles} from "./parts/styles";
import {TodoesList, TodoEditor} from "./parts";
import {EditorContextProvider} from "./parts/TodoEditorContext";
import {ITodoesData} from "../../Store/Todoes/types";


export const Todoes = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const todoes = useSelector(todoesListSelector);

  const [todoesList, setTodoesList] = React.useState<ITodoesData[]>(
    convertStoreObjectToArray(todoes.data)
  );
  const [todoInEditor, setTodoInEditor] = React.useState<number | undefined>();

  const onCloseEditor = React.useCallback(
    () => setTodoInEditor(undefined),
    []
  );
  const onSaveEditedTodo = React.useCallback(
    (todo) => {
      // dispatch(updateTodo(todo.id, todo));
    },
    []
  );

  React.useEffect(() => {
    setTodoesList(convertStoreObjectToArray(todoes.data));
  }, [todoes.data]);

  React.useEffect(() => {
    if (todoesList.length === 0) {
      dispatch(actions.GET_LIST());
    }
  }, []);

  return (
    <React.Fragment>
      <TodoesList openTodoInEditor={setTodoInEditor}/>

      <Dialog
        open={todoInEditor !== undefined}
        onClose={() => setTodoInEditor(undefined)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <React.Fragment>
          {((todoInEditor !== undefined) && todoes.data) && (
            <EditorContextProvider todo={todoes.data[todoInEditor]}>
              <TodoEditor onClose={onCloseEditor} onSave={onSaveEditedTodo}/>
            </EditorContextProvider>
          )}
        </React.Fragment>
      </Dialog>

      <Backdrop className={classes.backdrop} open={todoes.loading}>
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
            <Fab color="primary" onClick={() => dispatch(actions.GET_LIST())}>
              <CachedIcon/>
            </Fab>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
