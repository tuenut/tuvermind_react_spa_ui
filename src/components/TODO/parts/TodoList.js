import React, {Fragment} from "react";

import {Alert, Col, Button, Row, CardColumns} from "react-bootstrap";

import {TODOCard} from "./TODOCard";


export const TodoList = ({content, editTask, completeTask, deleteTask}) => (
  <Fragment>
    {
      content &&
      <CardColumns>
        {content.map((item, index) =>
          <TODOCard
            key={`${item.id}.${index}`}
            todo={item}
            editTask={editTask}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        )}
      </CardColumns>
    }
  </Fragment>
);