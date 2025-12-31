import { useCallback, useMemo, useState } from "react";
import type { Todo } from "./type";

interface TodoInputProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoInput = ({ todoList, setTodoList }: TodoInputProps) => {
  const [todoInput, setTodoInput] = useState("");
  
  const isButtonDisabled = useMemo(() => {
    return (
      todoInput.trim().length === 0 ||
      todoList.some((todo) => todo.text === todoInput.trim())
    );
  }, [todoInput, todoList]);

  const onChangeValue = useCallback((value: string) => {
    setTodoInput(value);
  }, []);

  const addTodo = useCallback(() => {
    if (isButtonDisabled) return;

    setTodoList([
      { id: Date.now(), text: todoInput, completed: false },
      ...todoList,
    ]);
    setTodoInput("");
  }, [todoInput, todoList, isButtonDisabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add todo..."
          className="px-4 py-3 bg-slate-700/20 rounded-xl text-white w-full"
          value={todoInput}
          onChange={(e) => onChangeValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addTodo}
          disabled={isButtonDisabled}
          className={`rounded-2xl px-5 py-3 text-sm font-semibold text-white transition shadow-md ${
            isButtonDisabled
              ? "bg-slate-600 cursor-not-allowed opacity-50"
              : "bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600"
          }`}
        >
          Add
        </button>
      </div>
      {todoList.some((todo) => todo.text === todoInput.trim()) && (
        <p className="text-red-400 text-sm">Todo already exists</p>
      )}
    </div>
  );
};
