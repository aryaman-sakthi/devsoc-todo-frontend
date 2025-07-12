import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'https://devsoc-todo-backend.onrender.com';

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE}/todos`);
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ desc: newTodo.trim() }),
      });
      
      if (response.ok) {
        setNewTodo('');
        await fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}/complete`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        await fetchTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Collaborative TODO</h1>
      
      <div className="todo-container">
        {/* Header */}
        <div className="header">
          <input
            className="header-input"
            value="Todo"
            readOnly
          />
        </div>

        {/* Scrollable Todo List */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              No todos yet. Add one below!
            </div>
          ) : (
            <div className="todos-container">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Todo Footer */}
        <div className="footer">
          <div className="footer-content">
            <div className="footer-checkbox"></div>
            <input
              type="text"
              placeholder="Add a task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="footer-input"
            />
            <button
              onClick={addTodo}
              disabled={loading}
              className={`add-button ${newTodo.trim() ? 'ready' : 'empty'}`}
            >
              {newTodo.trim() ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <div className="add-button-dot"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Ground */}
      <div className="ground-container">
        <div className="ground-animation">
          {/* First set of images */}
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
          {/* Duplicate set for seamless loop */}
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
          <img src="/ground.png" alt="Ground" className="ground-image" />
        </div>
      </div>

      {/* Walking Cat */}
      <img 
        src="/cat.gif" 
        alt="Walking Cat" 
        className="cat"
      />
    </div>
  );
};

// Separate component for todo items to handle hover states
const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="todo-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="todo-left">
        <button
          onClick={() => onToggle(todo.id)}
          className={`checkbox ${todo.completed ? 'completed' : ''}`}
        >
          {todo.completed && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
          {todo.desc}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={`delete-button ${isHovered ? 'hovered' : ''}`}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TodoApp;