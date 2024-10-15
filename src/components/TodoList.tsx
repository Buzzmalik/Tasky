/* import React from 'react' */
import "./TodoList.css";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosRadioButtonOff } from "react-icons/io";
/* import { CiEdit } from "react-icons/ci"; */
import { MdDelete } from "react-icons/md";

interface Todo {
  id: number,
  todo: string,
  dueDate: Date,
  completed: boolean,
}

interface Props {
  todos: Todo[];
  onDelete: (id:number) => void;
  onDone: (id:number) => void;
}

const TodoList = ({todos, onDelete, onDone}:Props) => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
        <div className="col-md-8 col-sm-12">
          <table className='table table-bordered'>
          <thead>
            <tr>
              <th></th>
              <th>Tasks</th>
              <th>Due</th>
              {/* <th></th> */}  {/* to be done later */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className={todo.completed? "completed": ""}>
                <td className="col-1 col-s-1">
                  <button className="btn" onClick={() => onDone(todo.id)}>{todo.completed?<IoIosRadioButtonOn />: <IoIosRadioButtonOff />}</button>
                </td>
                <td className="col-4 col-sm-8">{todo.todo}</td>
                <td className="col-1 col-sm-1">{todo.dueDate.toLocaleDateString()}</td>
                {/* <td className="col-1 col-sm-1">
                  <button className="btn btn-primary"><CiEdit /></button>
                </td> */} {/* to be done later */}
                <td className="col-1 col-sm-1">
                  <button className='btn btn-danger' onClick={() => onDelete(todo.id)}><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </div>
      
      
    </>
  )
}

export default TodoList