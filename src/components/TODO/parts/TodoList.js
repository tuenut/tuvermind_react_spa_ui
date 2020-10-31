import React from "react";

import {CardColumns} from "react-bootstrap";

import {v4 as uuidv4} from 'uuid';

import {TODOCard} from "./TODOCard";


export const TodoList = ({content = [], openTaskToEdit, completeTask, deleteTask}) => {

  return (
    <CardColumns>
      {content.map(item =>
        <TODOCard
          key={uuidv4()}
          todo={item}
          openTaskToEdit={openTaskToEdit}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      )}
    </CardColumns>
  );
};