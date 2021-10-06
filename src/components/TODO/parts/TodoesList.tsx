import React from "react";

import { v4 as uuidv4 } from "uuid";

import Grid from "@material-ui/core/Grid";
import { GridSize } from "@material-ui/core";

import { splitArrayToColumns, convertStoreObjectToArray } from "../../../libs";
import { useCardCols } from "../../../libs/hooks";
import { useTodoList } from "../../../libs/swrHooks";

import { TodoCard } from "./TodoCard";
import { TODO_OPEN_EDITOR, useTodoesListContext } from "./Context";


export const TodoesList = () => {
  const cols = useCardCols();

  const {data} = useTodoList();
  const todoesList = convertStoreObjectToArray(data?.results);

  const [, localDispatch] = useTodoesListContext();
  const openTodoInEditor = React.useCallback(
    (todoId) => localDispatch({
      type: TODO_OPEN_EDITOR,
      todo: todoId
    }),
    [localDispatch]
  );

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