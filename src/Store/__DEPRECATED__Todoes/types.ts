import {IBaseApiListState} from "../../libs/redux/types";

import {DateTime} from "luxon";
import {ITodo} from "../../__DEPRECATED__API/todoes/types";


export interface ITodoReminder {
  id?: number,
  when: DateTime
}

export interface ITodoEditablePart {
  id: ITodo["id"] | null,
  title: ITodo["title"],
  description: ITodo["description"],
  startDate: ITodo["startDate"],
  startTime: ITodo["startTime"],
  duration: ITodo["duration"],
  reminders: ITodo["reminders"],
  status?: ITodo["status"],
  created?: ITodo["created"] | null,
  updated?: ITodo["updated"],
  completed?: ITodo["completed"]
}

// STATE
export interface ITodoesListState extends IBaseApiListState {
  data: { [id: number]: ITodo },
}

