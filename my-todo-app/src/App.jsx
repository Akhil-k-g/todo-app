import React, { useEffect, useRef, useState } from "react";

function App() {
  
  const inputRef = useRef()

  const [todo,setTodo] =useState("");
  const [todos,setTodos] = useState([])
  
  const addTodo = ()=>{
     setTodos([...todos,todo])
     setTodo('')

  }

  const preventSubmit=(e)=>{
      e.preventDefault()

  }

  useEffect(()=>{
   inputRef.current.focus()
  })


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          TODO APP
        </h2>

        <form onSubmit={preventSubmit} className="flex gap-2 mb-6">
          <input value={todo} ref={inputRef} onChange={((e)=>{setTodo(e.target.value)})} 
            type="text"
            placeholder="Enter your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ADD
          </button>
        </form>

        <ul className="space-y-3">
         
           {todos.map((todo,index)=>{
              return(

              <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm">
              <span>{todo}</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
              Delete
            </button>
            </li>
  
              )
           })}
         
        </ul>
      </div>
    </div>
  );
}

export default App;