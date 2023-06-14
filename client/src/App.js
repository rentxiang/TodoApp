import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Header from './components/Header';

function App() {
  return (
    <section>
      <Header/>
    <div className='todo-app'>
      <TodoList />
    </div>
    </section>
  );
}

export default App;
