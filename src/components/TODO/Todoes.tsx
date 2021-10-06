import React from "react";

import useSWR from 'swr';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress"

import {
  FloatingActions,
  TodoesList,
  TodoEditorDialog,
  useStyles
} from "./parts";
import {TodoesListContextProvider} from "./parts/Context";
import axios from "axios";
import {TODOES_URL} from "../../settings/remoteAPI";
import {HOST} from "../../settings/remoteAPIHost";


export const defaultFetcher = (url) => axios.get(url)
  .then(res => res.data);

export const useTodoList = (page?) => {
  const url = new URL(TODOES_URL, HOST);

  if (page) {
    url.searchParams.set("page", page);
  }

  return useSWR(url.toString(), defaultFetcher);
};


export const Todoes = () => {
  const classes = useStyles();

  const {data, error, isValidating} = useTodoList();

  return (
    <React.Fragment>
      <TodoesListContextProvider>
        {data && <TodoesList/>}

        <TodoEditorDialog/>

        <Backdrop className={classes.backdrop} open={!data && ! error}>
          <CircularProgress color="inherit"/>
        </Backdrop>

        <FloatingActions/>

      </TodoesListContextProvider>
    </React.Fragment>
  );
};
