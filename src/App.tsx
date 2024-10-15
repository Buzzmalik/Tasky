import { useState, useEffect } from "react"
import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"
import "./App.css"

interface Todo {
  id: number,
  todo: string,
  dueDate: Date,
  completed: boolean
}

function loadTodosFromLocalStorage(): Todo[] {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    try {
      return JSON.parse(savedTodos).map((todo: Todo) => ({
        ...todo,
        dueDate: new Date(todo.dueDate), // Convert dueDate string back to a Date object
        completed: todo.completed||false
      }));
    } catch (error) {
      console.error("Failed to parse todos from local storage:", error);
      return [];
    }
  }
  return [];
};


function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodosFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const toggleCompletion = (id:number) => {
    setTodos(todos.map(todo => 
      todo.id === id? {...todo, completed:!todo.completed}:todo
    ));
  }

  return (
    <>
    <div className="text-center heading">
      <h1>Tasky</h1>
    </div>
    <div className="mb-5 mt-5">
      <AddTodo onSubmit={(todo) => setTodos(([...todos, {...todo, id:todos.length + 1, completed:false}]))}/>
    </div>

    <div>
      {todos.length > 0 && <TodoList 
      todos={todos}
      onDelete={(id) => setTodos(todos.filter((todo) => todo.id !== id))}
      onDone={toggleCompletion}
      />}
    </div>
      
      
    </>
  )
}

export default App

