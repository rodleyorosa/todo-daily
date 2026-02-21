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
            className="flex px-4 py-3 bg-slate-700/20 rounded-xl justify-between items-start gap-3 flex-shrink-0"
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <button
                onClick={() => toggleCompleted(id)}
                className={
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center transition flex-shrink-0 mt-0.5 " +
                  (completed
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-500 hover:border-indigo-400")
                }
              >
                {completed && (
                  <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
              <p
                className={`text-slate-100 break-all ${completed && "line-through"}`}
              >
                {text}
              </p>
            </div>
            <button
              onClick={() => removeTodo(id)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer transition flex-shrink-0 mt-0.5"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};