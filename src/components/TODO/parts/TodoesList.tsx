import React from "react";

import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import {GridSize} from "@material-ui/core";

import {todoesListSelector} from "../../../Store/Todoes/reducers";
import {splitArrayToColumns} from "../utils";
import {convertStoreObjectToArray} from "../../../libs/common"
import {TodoCard} from "./TodoCard";


export const TodoesList = ({openTodoInEditor}) => {
  const theme = useTheme();

  const breakpoints = [
    useMediaQuery(theme.breakpoints.up('lg')) && 4,
    useMediaQuery(theme.breakpoints.up('md')) && 3,
    useMediaQuery(theme.breakpoints.up('sm')) && 2,
    useMediaQuery(theme.breakpoints.up('xs')) && 1,
  ];
  const cols = breakpoints.find(x => x) || 1;

  const todoesStore = useSelector(todoesListSelector);
  const todoesList = convertStoreObjectToArray(todoesStore.data);

  return (
    <Grid container spacing={2} alignContent="center">

      {splitArrayToColumns(todoesList, cols).map(column => (
        <Grid item xs={Math.floor(12 / cols) as GridSize} key={uuidv4()}>
          <Grid container spacing={2} alignContent="flex-start">

            {column.map((todo, idx) => (
              <Grid item xs={12} key={uuidv4()}>
                <TodoCard
                  todo={todo}
                  openTodoInEditor={openTodoInEditor}
                />
              </Grid>
            ))}

          </Grid>
        </Grid>
      ))}

    </Grid>
  )
};