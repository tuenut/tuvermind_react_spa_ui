import React from "react";

import {Backdrop, Box, CircularProgress, Fab, Grid, GridSize} from '@material-ui/core';

import {Add as AddIcon, Cached as CachedIcon} from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';

import {v4 as uuidv4} from "uuid";

import {TodoProvider} from "./Context";
import {TodoCard} from "./parts/TodoCard";
import {splitArrayToColumns} from "./utils";
import {useDispatch, useSelector} from "react-redux";
import {todoesListSelector} from "../../Store/Todoes/reducers";
import {getTodoesList} from "../../Store/Todoes";


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const TodoContent = () => {
  const theme = useTheme();

  const breakpoints = [
    useMediaQuery(theme.breakpoints.up('lg')) && 4,
    useMediaQuery(theme.breakpoints.up('md')) && 3,
    useMediaQuery(theme.breakpoints.up('sm')) && 2,
    useMediaQuery(theme.breakpoints.up('xs')) && 1,
  ];
  const cols = breakpoints.find(x => x) || 1;

  const todoesList = useSelector(todoesListSelector);

  return (
    <React.Fragment>
      <Grid container spacing={2} alignContent="center">
        {splitArrayToColumns(todoesList.data!, cols).map(column => (
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
            <Fab color="primary" onClick={() => null}>
              <CachedIcon/>
            </Fab>
          </Grid>
        </Grid>
      </Box>

    </React.Fragment>
  )
};

export const Todoes = () => {
  const classes = useStyles();

  const todoesList = useSelector(todoesListSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (todoesList.data === null) {
      dispatch(getTodoesList());
    }
  }, []);

  return (
    <React.Fragment>
      {!todoesList.loading && <TodoContent/>}

      <Backdrop className={classes.backdrop} open={todoesList.loading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </React.Fragment>
  );
};
