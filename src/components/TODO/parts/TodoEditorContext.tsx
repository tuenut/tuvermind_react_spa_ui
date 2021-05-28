import React from "react";

import { ITodoInEditor } from "../../../Store/Todoes/types";


export const newTodo = (): ITodoInEditor => ({
  id: null,
  title: "",
  description: "",
  start_date: "",
  duration: null,
  reminders: []
});


export const SET_TITLE = "SET_TITLE";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_DURATION = "SET_DURATION";
export const SET_DATE = "SET_DATE";
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
  payload: string
}

export interface ISetSchedule {
  type: typeof SET_SCHEDULE,
  payload: string
}

export interface ISetReminders {
  type: typeof SET_REMINDERS,
  payload: number[]
}

export type EditorActionsTypes =
  | ISetTitle
  | ISetDecription
  | ISetDate
  | ISetDuration
  | ISetSchedule
  | ISetReminders
  ;

export type EditorReducer = React.Reducer<ITodoInEditor, EditorActionsTypes>;

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
      return ({...state, start_date: action.payload});

    case SET_REMINDERS:
      return ({...state, reminders: action.payload});

    default:
      return state;
  }
};


const EditorContext = React.createContext(null! as [ITodoInEditor, React.Dispatch<EditorActionsTypes>]);
export const useEditorContext = () => React.useContext(EditorContext);
export const EditorContextProvider = (props) => {
  const [todo, dispatch] = React.useReducer(reducer, {...props.todo} as ITodoInEditor);

  const value = React.useMemo(() => [todo, dispatch], [todo]);

  return <EditorContext.Provider {...props} value={value}/>
};

