import React, { useEffect, useRef, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function App() {
  const inputRef = useRef();

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }
    if (editId) {
      const findTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === findTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list }),
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
  };

  const preventSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id) => {
    let complete = todos.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setTodos(complete);
  };

  const editTodo = (id) => {
    const editingTodo = todos.find((to) => to.id === id);
    setTodo(editingTodo.list);
    setEditId(editingTodo.id);
    console.log(editingTodo);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          TODO APP
        </h2>

        <form onSubmit={preventSubmit} className="flex gap-2 mb-6">
          <input
            value={todo}
            ref={inputRef}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            type="text"
            placeholder="Enter your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? "EDIT" : "ADD"}
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo, index) => {
            return (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm"
              >
                <span className={todo.status ? "line-through opacity-50" : ""}>
                  {" "}
                  {todo.list}{" "}
                </span>
                <div className="flex flex-row gap-2">
                  <IoMdDoneAll
                    onClick={() => {
                      completeTodo(todo.id);
                    }}
                    className="cursor-pointer text-green-600"
                    title="complete"
                  />
                  <FiEdit
                    onClick={() => {
                      editTodo(todo.id);
                    }}
                    className="cursor-pointer text-blue-600"
                    title="edit"
                  />
                  <MdDelete
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    className="cursor-pointer text-red-600"
                    title="delete"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
