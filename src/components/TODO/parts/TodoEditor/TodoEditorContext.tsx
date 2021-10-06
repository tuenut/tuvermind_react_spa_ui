import React from "react";

import { DateTime } from "luxon";

import { ITodoEditablePart, ITodoReminder } from "../../../../Store/__DEPRECATED__Todoes/types";
import {ITodo} from "../../../../__DEPRECATED__API/todoes/types";


export const newTodo = (): ITodoEditablePart => ({
  id: null,
  title: "",
  description: "",
  startDate: null,
  startTime: null,
  duration: null,
  reminders: []
});


export const SET_TITLE = "SET_TITLE";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_DURATION = "SET_DURATION";
export const SET_DATE = "SET_DATE";
export const SET_TIME = "SET_TIME";
export const SET_SCHEDULE = "SET_SCHEDULE";
export const SET_REMINDERS = "SET_REMINDERS";

export interface ISetTitle {
  type: typeof SET_TITLE,
  payload: string
}

export interface ISetDecription {
  type: typeof SET_DESCRIPTION,
  payload: string
}

export interface ISetDuration {
  type: typeof SET_DURATION,
  payload: number
}

export interface ISetDate {
  type: typeof SET_DATE,
  payload: DateTime
}

export interface ISetTime {
  type: typeof SET_TIME,
  payload: DateTime
}

export interface ISetSchedule {
  type: typeof SET_SCHEDULE,
  payload: string
}

export interface ISetReminders {
  type: typeof SET_REMINDERS,
  payload: ITodoReminder[]
}

export type EditorActionsTypes =
  | ISetTitle
  | ISetDecription
  | ISetDate
  | ISetTime
  | ISetDuration
  | ISetSchedule
  | ISetReminders
  ;

export type EditorReducer =
  React.Reducer<ITodoEditablePart | ITodo, EditorActionsTypes>;

const defaultState = newTodo();

const reducer: EditorReducer = (state = defaultState, action) => {
  switch ( action.type ) {
    case SET_TITLE:
      return ({...state, title: action.payload});

    case SET_DESCRIPTION:
      return ({...state, description: action.payload});

    case SET_DURATION:
      return ({...state, duration: action.payload});

    case SET_DATE:
      return ({...state, startDate: action.payload});

    case SET_TIME:
      return ({...state, startTime: action.payload});

    case SET_REMINDERS:
      return ({...state, reminders: action.payload});

    default:
      return state;
  }
};


const EditorContext = React.createContext(null! as [ITodo, React.Dispatch<EditorActionsTypes>]);
export const useEditorContext = () => React.useContext(EditorContext);
export const EditorContextProvider = (props) => {
  const [todo, dispatch] = React.useReducer(reducer, {...props.todo} as ITodo);

  const value = React.useMemo(() => [todo, dispatch], [todo]);

  return <EditorContext.Provider {...props} value={value}/>
};

