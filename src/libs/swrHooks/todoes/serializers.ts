import { DateTime } from "luxon";

import { ITodoFromApi, ITodoObject, ITodoReminderFromApi, ITodoReminderObject } from "./types";


export const deserializeReminder =
  (reminder: ITodoReminderFromApi): ITodoReminderObject => ({
    id: reminder.id,
    when: DateTime.fromISO(reminder.when)
  });

export const deserializeTodo = (todo: ITodoFromApi): ITodoObject => ({
  id: todo.id,
  title: todo.title,
  description: todo.description,
  startTime: todo.start_time ? DateTime.fromISO(todo.start_time) : null,
  startDate: DateTime.fromISO(todo.start_date),
  duration: todo.duration,
  status: todo.status,
  created: DateTime.fromISO(todo.created),
  updated: todo.updated ? DateTime.fromISO(todo.updated) : null,
  completed: todo.completed ? DateTime.fromISO(todo.completed) : null,
  reminders: todo.reminders.map(deserializeReminder)
});