import React from "react";

import {Backdrop, Box, CircularProgress, Fab, Grid, GridSize} from '@material-ui/core';

import {Add as AddIcon, Cached as CachedIcon} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import {v4 as uuidv4} from "uuid";

import {TodoProvider, useTodo} from "./Context";
import {TodoCard} from "./parts/TodoCard";
import {updateListAction} from "./Context/actions";
import {getTestTodoes} from "./Context/testData";
import {ApiMock, URI} from "../../API";
import {TODOES_URL} from "../../settings/remoteAPI";
import {splitArrayToColumns} from "./utils";
import {TodoListType} from "./Context/dataTypes";


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const TodoContent = ({getData}) => {
  const theme = useTheme();

  const breakpoints = [
    useMediaQuery(theme.breakpoints.up('lg')) && 4,
    useMediaQuery(theme.breakpoints.up('md')) && 3,
    useMediaQuery(theme.breakpoints.up('sm')) && 2,
    useMediaQuery(theme.breakpoints.up('xs')) && 1,
  ];
  const cols = breakpoints.find(x => x) || 1;

  const [todoList] = useTodo();

  return (
    <React.Fragment>
      <Grid container spacing={2} alignContent="center">
        {splitArrayToColumns(todoList, cols).map(column => (
          <Grid item xs={Math.floor(12 / cols) as GridSize} key={uuidv4()}>
            <Grid container spacing={2} alignContent="flex-start">

              {column.map((todo, idx) => (
                <Grid item xs={12} key={uuidv4()}>
                  <TodoCard {...todo}/>
                </Grid>
              ))}

            </Grid>
          </Grid>
        ))}
      </Grid>

      <Box position="fixed" bottom={20} right={20}>
        <Grid container spacing={2}>
          <Grid item>
            <Fab onClick={() => null}>
              <AddIcon/>
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" onClick={getData}>
              <CachedIcon/>
            </Fab>
          </Grid>
        </Grid>
      </Box>

    </React.Fragment>
  )
};

export const TodoLayout = () => {
  const classes = useStyles();

  const [apiResponse, setApiResponse] = React.useState<any | null>(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [, dispatch] = useTodo();

  const getData = React.useCallback(() => {
    if (!isFetching) {
      setIsFetching(true);

      const url = new URI(TODOES_URL).list();

      const successHandler = res => {
        setApiResponse(res);
        setIsFetching(false);
        dispatch(updateListAction(res));
      };
      const errorHandler = error => setIsFetching(false);

      new ApiMock(1000, 5000, getTestTodoes)
        .list(url, successHandler, errorHandler);
    }
  }, [isFetching]);

  React.useEffect(() => {
    if (apiResponse === null) {
      getData();
    }
  }, []);

  return (
    <React.Fragment>
      {(!isFetching) && (
        <TodoContent getData={getData}/>
      )}

      <Backdrop className={classes.backdrop} open={isFetching}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </React.Fragment>
  );
};

export const TODOPage = () => (
  <TodoProvider>

    <TodoLayout/>

  </TodoProvider>
);