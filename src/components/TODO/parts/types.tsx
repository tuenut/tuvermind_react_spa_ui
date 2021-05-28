import { TodoType, ITodoFromApi } from "../../../Store/Todoes/types";
import { TODO_CLOSE_EDITOR, TODO_OPEN_EDITOR } from "./Context";


export interface TodoEditorProps {
  onClose: () => void,
  onSave: (todo: TodoType) => void
}


export interface TodoCardProps {
  todo: ITodoFromApi,
  openTodoInEditor: Function
}

export type todoIdType = number | undefined | null;

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