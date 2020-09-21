import React, {useEffect, useState, useCallback} from "react";

import axios from "axios/index";

import {CardColumns} from "react-bootstrap";

import {TODOES_URL} from "../../settings/remoteAPI";
import {TODOEdit, TODOList} from "./parts";
import {listToObject} from "../../utils/common";


const getTODO = (list, id) => list && listToObject(list)[id];

export const TODOPage = () => {
  const [todoList, setTodoList] = useState();
  const [editingTodoId, setEditingTodoId] = useState();
  const [showEditCard, setShowEditCard] = useState(false);

  const todoSelectedToEdit = getTODO(todoList, editingTodoId);

  const editTodo = useCallback((id) => {
    setEditingTodoId(id);

    if (todoSelectedToEdit && (todoSelectedToEdit.id !== id)) {
      setShowEditCard(true);
    } else {
      setShowEditCard(!showEditCard);
    }
  });

  useEffect(() => {
    if (!todoList) {
      axios
      // TODO implement pagination
        .get(`${TODOES_URL}`)
        .then(res => setTodoList(res.data.results))
        .catch(err => {
          console.log(err);
          alert("Error while request TODO in `TODOPage->useEffect`. See console for info.")
        })
    }
    return () => console.log("component unMount");
  }, []);

  return (
    <CardColumns>
      <TODOList content={todoList} onEditClick={editTodo}/>
      <TODOEdit todo={todoSelectedToEdit} show={showEditCard}/>
    </CardColumns>
  )
};