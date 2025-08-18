import { Check, Delete, PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [showTodo, setShowTodo] = useState([]);

  // Save to localStorage whenever showTodo changes
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(showTodo));
  }, [showTodo]);

  // Load todos once on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      setShowTodo(JSON.parse(storedTodos));
    }
  }, []);

  const handleTodo = () => {
    if (!todo.trim()) return;
    setShowTodo((prev) => [...prev, { text: todo, checked: false }]);
    setTodo(""); // clear input
  };

  const handleDelete = (id) => {
    setShowTodo((prev) => prev.filter((_, index) => index !== id));
  };

  const handleCheck = (id) => {
    setShowTodo((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleUpdate = (id) => {
    setTodo(showTodo[id].text); // puts old value back into input
    setShowTodo((prev) => prev.filter((_, index) => index !== id)); // remove old so you can re-add
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border border-gray-200 rounded shadow px-4 py-2"
          value={todo}
          placeholder="Enter today tasks"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={handleTodo}
          onKeyDown={(e)=>{
            if(e.key=="Enter"){
                handleTodo();
            }
          }}
          className="bg-sky-400 px-4 py-2 rounded text-white font-medium"
        >
          Create Todo
        </button>
      </div>

      {showTodo.map((data, index) => (
        <div
          key={index}
          className={`mt-2 border border-gray-200 rounded px-4 py-2 ${
            data.checked ? "bg-red-500 text-white" : "bg-white "
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{data.text}</span> {/* ✅ show todo text */}
            <div className="flex gap-2">
              <Delete
                className="text-red-300 w-4 h-4 cursor-pointer"
                onClick={() => handleDelete(index)}
              />
              <Check
                className="text-green-400 w-4 h-4 cursor-pointer"
                onClick={() => handleCheck(index)}
              />
              <PlusIcon
                className="text-blue-500 w-4 h-4 cursor-pointer"
                onClick={() => handleUpdate(index)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
