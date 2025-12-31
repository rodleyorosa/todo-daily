import { useCallback, useEffect } from "react";
import type { Todo, TodoStorage } from "./type";
import { getToday } from "./utils";

interface TodoListProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList = ({ todoList, setTodoList }: TodoListProps) => {
  if (todoList.length === 0) return;

  const toggleCompleted = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  useEffect(() => {
    const storage: TodoStorage = {
      todos: todoList,
      date: getToday(),
    };
    localStorage.setItem("todos", JSON.stringify(storage));
  }, [todoList]);

  return (
    <div className="flex flex-col p-4 gap-4 overflow-y-auto">
      {todoList.map(({ id, text, completed }) => {
        return (
          <div
            key={id}
            className="flex px-4 py-3 bg-slate-700/20 rounded-xl justify-between items-center flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCompleted(id)}
                className={
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center transition " +
                  (completed
                    ? "border-emerald-400 bg-emerald-400"
                    : "border-slate-500 group-hover:border-indigo-400")
                }
              >
                {completed && (
                  <span className="text-xs font-bold text-black">✓</span>
                )}
              </button>
              <label
                className={`text-slate-100 ${completed && "line-through"}`}
              >
                {text}
              </label>
            </div>
            <button
              onClick={() => removeTodo(id)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer transition"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
