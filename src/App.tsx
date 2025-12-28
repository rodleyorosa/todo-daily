function App() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="m-auto bg-red-500 min-w-96 bg-slate-800/80 rounded-xl border border-slate-700">
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-white">Today's todo</h1>
          <p className="text-slate-400">3/3 completed</p>
        </div>

        <hr className="border border-slate-700" />

        <div className="flex flex-col p-4 gap-4">
          <div className="flex items-center px-4 py-3 bg-slate-700/20 gap-3 rounded-xl">
            <input type="checkbox" className="h-5 w-5" />
            <label className="text-slate-100">Todo 1</label>
          </div>
          <div className="flex items-center px-4 py-3 bg-slate-700/20 gap-3 rounded-xl">
            <input type="checkbox" className="h-5 w-5" />
            <label className="text-slate-100">Todo 2</label>
          </div>
          <div className="flex items-center px-4 py-3 bg-slate-700/20 gap-3 rounded-xl">
            <input type="checkbox" className="h-5 w-5" />
            <label className="text-slate-100">Todo 3</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
