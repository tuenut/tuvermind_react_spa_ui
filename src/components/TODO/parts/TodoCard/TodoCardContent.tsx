import React from "react";

import { DateTime } from "luxon";

import Collapse from "@material-ui/core/Collapse/Collapse";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

export const TodoCardContent = ({todo, expanded}) => {
  const showUpdate = (new Date(todo.updated).valueOf() - new Date(todo.created).valueOf()) > 10000;

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>

        <Typography paragraph color="textPrimary">
          {todo.description}
        </Typography>

        <Typography paragraph color="textSecondary">
          <small>
            Создано: {todo.created.toLocaleString(DateTime.DATETIME_MED)}
          </small>

          {showUpdate && (
            <React.Fragment>
              <br/>
              <small>
                Обновлено: {todo.updated.toLocaleString(DateTime.DATETIME_MED)}
              </small>
            </React.Fragment>
          )}
        </Typography>

      </CardContent>
    </Collapse>
  );
};