export const EMPTY_REMINDER = {value: 0, dimension: "min"};
export const EMPTY_TODO_OBJECT = {
  id: "",
  title: "",
  description: "",
  planned_completion_date: "",
  planned_completion_time: "",
  reminders: [{...EMPTY_REMINDER}],
  completed: null
};