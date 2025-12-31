import { useEffect, useMemo, useState } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import type { Todo, TodoStorage } from "./type";
import { getTimeUntilMidnight, getToday } from "./utils";

const firstLoadTodoList = (): Todo[] => {
  const todosSaved = localStorage.getItem("todos");
  if (!todosSaved) return [];

  try {
    const data: TodoStorage = JSON.parse(todosSaved);
    const today = getToday();

    if (data.date !== today) {
      const incompleteTodos = data.todos.filter((todo) => !todo.completed);
      const newStorage: TodoStorage = {
        todos: incompleteTodos,
        date: today,
      };
      localStorage.setItem("todos", JSON.stringify(newStorage));
      return incompleteTodos;
    }

    return data.todos;
  } catch {
    return [];
  }
};

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(firstLoadTodoList());
  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeRemainingMessage = useMemo(
    () =>
      `The completed todos will be removed automatically in ${timeRemaining}`,
    [timeRemaining]
  );

  const totalCompleted = useMemo(() => {
    return todoList.filter((todo) => todo.completed).length;
  }, [todoList]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-6 sm:p-2">
      <div className="m-auto w-full max-w-2xl max-h-[calc(100vh-3rem)] flex flex-col bg-slate-800/80 rounded-xl border border-slate-700">
        <div className="p-4 flex flex-col gap-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-white">Today's todo</h1>
            <p className="text-slate-400">
              {totalCompleted}/{todoList.length} completed
            </p>
            <p className="text-slate-500 text-sm mt-1">
              {timeRemainingMessage}
            </p>
          </div>
          <TodoInput todoList={todoList} setTodoList={setTodoList} />
        </div>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
};

export default App;
