import { ITodoFromApi } from "../../../API/todoes/types";
import { TODO_CLOSE_EDITOR, TODO_OPEN_EDITOR } from "./Context";


export interface TodoCardProps {
  todo: ITodoFromApi,
  openTodoInEditor: Function
}

export interface ITodoOpenEditor {
  type: typeof TODO_OPEN_EDITOR,
  todo: number | null
}

export interface ITodoCloseEditor {
  type: typeof TODO_CLOSE_EDITOR
}

export type actions =
  | ITodoOpenEditor
  | ITodoCloseEditor
  ;

export interface ILocalState {
  editorTodo: number | undefined | null
}

export interface IUseTodoesListContext {
  (): [ILocalState, (action: actions) => void]
}