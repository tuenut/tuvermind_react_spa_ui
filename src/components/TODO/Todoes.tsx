import React from "react";

import { useDispatch, useSelector } from "react-redux";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress"

import { actions, todoesListSelector } from "../../Store/Todoes";

import {
  FloatingActions,
  TodoesList,
  TodoEditorDialog,
  useStyles
} from "./parts";
import { TodoesListContextProvider } from "./parts/Context";


export const Todoes = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const todoes = useSelector(todoesListSelector);

  React.useEffect(() => {
    dispatch(actions.GET_LIST());
  }, [dispatch]);

  return (
    <React.Fragment>
      <TodoesListContextProvider>
        <TodoesList/>

        <TodoEditorDialog/>

        <Backdrop className={classes.backdrop} open={todoes.loading}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <FloatingActions/>

      </TodoesListContextProvider>
    </React.Fragment>
  );
};
