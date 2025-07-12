import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:3000';

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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '64px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: '#374151',
      marginBottom: '32px',
      position: 'relative',
      zIndex: 10
    },
    todoContainer: {
      width: '100%',
      maxWidth: '448px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 10
    },
    header: {
      padding: '16px',
      borderBottom: '1px solid #e5e7eb'
    },
    headerInput: {
      width: '100%',
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#374151',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'default'
    },
    todoList: {
      height: '256px',
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#9ca3af #f3f4f6'
    },
    emptyState: {
      padding: '16px',
      textAlign: 'center',
      color: '#6b7280'
    },
    todosContainer: {
      padding: '16px'
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '12px',
      padding: '4px 0'
    },
    todoLeft: {
      display: 'flex',
      alignItems: 'center',
      flex: 1
    },
    checkbox: {
      width: '24px',
      height: '24px',
      border: '2px solid #d1d5db',
      borderRadius: '4px',
      marginRight: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    checkboxCompleted: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      color: 'white'
    },
    todoText: {
      flex: 1,
      color: '#374151'
    },
    todoTextCompleted: {
      textDecoration: 'line-through',
      color: '#6b7280'
    },
    deleteButton: {
      padding: '4px',
      color: '#9ca3af',
      cursor: 'pointer',
      opacity: 0,
      transition: 'all 0.2s'
    },
    deleteButtonHover: {
      color: '#ef4444',
      opacity: 1
    },
    footer: {
      padding: '16px',
      backgroundColor: '#dcfce7',
      borderTop: '1px solid #e5e7eb'
    },
    footerContent: {
      display: 'flex',
      alignItems: 'center'
    },
    footerCheckbox: {
      width: '24px',
      height: '24px',
      border: '2px solid #4ade80',
      borderRadius: '4px',
      marginRight: '12px'
    },
    footerInput: {
      flex: 1,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#374151',
      fontSize: '16px'
    },
    addButton: {
      marginLeft: '12px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    addButtonEmpty: {
      backgroundColor: '#d1d5db',
      color: '#6b7280'
    },
    addButtonReady: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    addButtonReady_hover: {
      backgroundColor: '#059669'
    },
    groundContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '200px',
      overflow: 'hidden',
      zIndex: 1
    },
    groundImage: {
      position: 'absolute',
      bottom: 0,
      height: '100%',
      width: '45%',
      objectFit: 'cover',
      animation: 'scrollGround 15s linear infinite'
    },
    cat: {
      position: 'absolute',
      bottom: '170px',
      left: '70px',
      width: '250px',
      height: 'auto',
      zIndex: 0,
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Collaborative TODO</h1>
      
      <div style={styles.todoContainer}>
        {/* Header */}
        <div style={styles.header}>
          <input
            style={styles.headerInput}
            value="Todo"
            readOnly
          />
        </div>

        {/* Scrollable Todo List */}
        <div style={styles.todoList}>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              No todos yet. Add one below!
            </div>
          ) : (
            <div style={styles.todosContainer}>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  styles={styles}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Todo Footer */}
        <div style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerCheckbox}></div>
            <input
              type="text"
              placeholder="Add a task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={styles.footerInput}
            />
            <button
              onClick={addTodo}
              disabled={loading}
              style={{
                ...styles.addButton,
                ...(newTodo.trim() ? styles.addButtonReady : styles.addButtonEmpty)
              }}
              onMouseEnter={(e) => {
                if (newTodo.trim()) {
                  e.target.style.backgroundColor = '#059669';
                }
              }}
              onMouseLeave={(e) => {
                if (newTodo.trim()) {
                  e.target.style.backgroundColor = '#10b981';
                }
              }}
            >
              {newTodo.trim() ? (
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: 'currentColor',
                  borderRadius: '50%'
                }}></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Ground */}
      <div style={styles.groundContainer}>
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '0'}} 
        />
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '33.33%'}} 
        />
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '66.66%'}} 
        />
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '100%'}} 
        />
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '133.33%'}} 
        />
        <img 
          src="/ground_v2.png" 
          alt="Ground" 
          style={{...styles.groundImage, left: '166.66%'}} 
        />
      </div>

      {/* Walking Cat */}
      <img 
        src="/cat.gif" 
        alt="Walking Cat" 
        style={styles.cat}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
          .todo-list::-webkit-scrollbar {
            width: 8px;
          }
          .todo-list::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 4px;
          }
          .todo-list::-webkit-scrollbar-thumb {
            background: #9ca3af;
            border-radius: 4px;
          }
          .todo-list::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
          
          @keyframes scrollGround {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
        `
      }} />
    </div>
  );
};

// Separate component for todo items to handle hover states
const TodoItem = ({ todo, onToggle, onDelete, styles }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={styles.todoItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.todoLeft}>
        <button
          onClick={() => onToggle(todo.id)}
          style={{
            ...styles.checkbox,
            ...(todo.completed ? styles.checkboxCompleted : {})
          }}
        >
          {todo.completed && (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <span style={{
          ...styles.todoText,
          ...(todo.completed ? styles.todoTextCompleted : {})
        }}>
          {todo.desc}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          ...styles.deleteButton,
          ...(isHovered ? styles.deleteButtonHover : {})
        }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TodoApp;