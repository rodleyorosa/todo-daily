import { useCallback, useEffect, useMemo, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [todoInput, setTodoInput] = useState("");

  const totalCompleted = useMemo(() => {
    return todoList.filter((todo) => todo.completed).length;
  }, [todoList]);

  const isButtonDisabled = useMemo(() => {
    return (
      todoInput.trim().length === 0 ||
      todoList.some((todo) => todo.text === todoInput.trim())
    );
  }, [todoInput, todoList]);

  const onChangeValue = useCallback((value: string) => {
    setTodoInput(value);
  }, []);

  const toggleCompleted = useCallback((id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const addTodo = useCallback(() => {
    if (isButtonDisabled) return;

    setTodoList([
      { id: Date.now(), text: todoInput, completed: false },
      ...todoList,
    ]);
    setTodoInput("");
  }, [todoInput, todoList, isButtonDisabled]);

  const removeTodo = useCallback((id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        addTodo();
      }
    },
    [addTodo]
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
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
          </div>
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
        </div>

        {todoList.length > 0 && (
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
                      className={`text-slate-100 ${
                        completed && "line-through"
                      }`}
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
        )}
      </div>
    </div>
  );
}

export default App;
