import React from "react";
import {CRON, CronScheduleType, IBaseTodo, MEMO, TODO} from "../../../Store/Todoes/types";

export const SET_TITLE = "SET_TITLE";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_TYPE = "SET_TYPE";
export const SET_DURATION = "SET_DURATION";
export const SET_DATE = "SET_DATE";
export const SET_SCHEDULE = "SET_SCHEDULE";
export const SET_TODO = "SET_TODO";


export interface IEditorTodoData extends IBaseTodo {
  date?: number | null,
  schedule?: CronScheduleType,

  [key: string]: any
}

export type EditorActionsTypes =
  | typeof SET_TITLE
  | typeof SET_DESCRIPTION
  | typeof SET_TYPE
  | typeof SET_DURATION
  | typeof SET_DATE
  | typeof SET_SCHEDULE
  | typeof SET_TODO
  ;

export interface EditorActions {
  type: EditorActionsTypes,
  payload: any
}

export type EditorReducer = React.Reducer<IEditorTodoData, EditorActions>;

const reduceSetTitle: EditorReducer = (state, action) => ({
  ...state,
  title: action.payload
});

const reduceSetDescription: EditorReducer = (state, action) => ({
  ...state,
  description: action.payload
});

const reduceSetType: EditorReducer = (state, action) => ({
  ...state,
  type: action.payload
});
const reduceSetDuration: EditorReducer = (state, action) => ({
  ...state,
  duration: action.payload
});
const reduceSetDate: EditorReducer = (state, action) => ({
  ...state,
  date: action.payload
});
const reduceSetSchedule: EditorReducer = (state, action) => ({
  ...state,
  schedule: action.payload
});


const reducer: EditorReducer =
  (state = {} as IEditorTodoData, action) => {
    switch (action.type) {
      case SET_TITLE:
        return reduceSetTitle(state, action);

      case SET_DESCRIPTION:
        return reduceSetDescription(state, action);

      case SET_TYPE:
        return reduceSetType(state, action);

      case SET_DURATION:
        return reduceSetDuration(state, action);

      case SET_DATE:
        return reduceSetDate(state, action);

      case SET_SCHEDULE:
        return reduceSetSchedule(state, action);

      case SET_TODO:
        return ({...action.payload});

      default:
        return state;
    }
  };


const EditorContext = React.createContext(null! as [IEditorTodoData, React.Dispatch<EditorActions>]);
export const useEditorContext = () => React.useContext(EditorContext);
export const EditorContextProvider = (props) => {
  const [todo, dispatch] = React.useReducer(reducer, {...props.todo} as IEditorTodoData);

  React.useEffect(() => {
    dispatch({type: SET_TODO, payload: props.todo});

    return () => dispatch({type: SET_TODO, payload: {}});
  }, [props.todo]);

  const value = React.useMemo(() => [todo, dispatch], [todo]);

  return <EditorContext.Provider {...props} value={value}/>
};