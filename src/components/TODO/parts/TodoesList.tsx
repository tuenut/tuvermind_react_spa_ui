import React from "react";

import { v4 as uuidv4 } from "uuid";

import Grid, { GridSize } from "@material-ui/core/Grid";

import { splitArrayToColumns, convertStoreObjectToArray } from "../../../libs";
import { useCardCols } from "../../../libs/hooks";
import { useTodoList } from "../../../libs/swrHooks";

import { TodoCard } from "./TodoCard";


export const TodoesList = () => {
  const {data} = useTodoList();
  const todoesList = convertStoreObjectToArray(data?.results);
  const cols = useCardCols();

  return (
    <Grid container spacing={2} alignContent="center">

      {splitArrayToColumns(todoesList, cols).map((column) => (
        <Grid item xs={Math.floor(12 / cols) as GridSize} key={uuidv4()}>
          <Grid container spacing={2} alignContent="flex-start">

            {column.map((todo) => (
              <Grid item xs={12} key={todo.id}>
                <TodoCard todo={todo}/>
              </Grid>
            ))}

          </Grid>
        </Grid>
      ))}

    </Grid>
  )
};