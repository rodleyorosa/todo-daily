export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoStorage = {
  todos: Todo[];
  date: string;
};
