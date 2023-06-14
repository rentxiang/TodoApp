import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FaRobot } from 'react-icons/fa';

// define Todo object
const Todo = ({ todos, completeTodo, removeTodo, updateTodo, addStep }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div className='mark' key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />

        <span onClick={() => addStep(todo.id)} className="span-bot">
          <p style={{ fontSize: 15 }}>
            AI Steps
            <FaRobot onClick={() => addStep(todo.id)} className="bot-icon" />
          </p>
        </span>
      </div>
    </div>
  ));
};

export default Todo;
