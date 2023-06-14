import React, { useState, useRef, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  // useState for managing the status of our objects
  const [todos, setTodos] = useState([]);
  const [steps, setSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [stepText, setStepText] = useState('');
  const [input, setInput] = useState('default input');



  const openSteps = () => {
    setShowSteps(true);
  };

  const closeSteps = () => {
    setShowSteps(false);
  };

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
  };

  const addStep = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const text = todo.text;

    const newStep = { text: text };
    const newSteps = [newStep, ...steps];
    setSteps(newSteps);
    openSteps();
    setStepText('Taking a sec to OpenAI...');


// get response from Openai

    const response = await fetch('http://localhost:3080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    });
    const data = await response.json();
    console.log(data);
    setStepText(data.message);
    console.log(data.message);

  };



  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };



  return (
    <>
      <h1>Hi! What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      {/* This is the Steps */}
      {showSteps && (
        <div className="steps">
          <h1>Steps:</h1>
          <p className="answer">{stepText}</p>
          <div onClick={closeSteps} className="span-answer">
            <p className='comfirm' style={{ fontSize: 15 }}>Got it! </p>
          </div>
        </div>
      )}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        addStep={addStep}
      />
    </>
  );
}

export default TodoList;
