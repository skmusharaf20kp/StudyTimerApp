import React, { useState } from 'react'
import { CheckCircle, Circle, Plus, Filter } from 'lucide-react'
import { TODO_ITEMS } from '../data/mockData'
import './TodoListScreen.css'

const TodoListScreen = () => {
  const [todos, setTodos] = useState(TODO_ITEMS)
  const [filter, setFilter] = useState('all') // all, completed, pending

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'pending') return !todo.completed
    return true
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444'
      case 'medium': return '#F59E0B'
      case 'low': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getSubjectInitial = (subject) => {
    return subject.charAt(0).toUpperCase()
  }

  return (
    <div className="todo-screen">
      <div className="screen-header">
        <h1 className="screen-title">Todo List</h1>
        <button className="add-todo-button">
          <Plus size={24} />
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button 
            className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({todos.filter(t => !t.completed).length})
          </button>
          <button 
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Done ({todos.filter(t => t.completed).length})
          </button>
        </div>
      </div>
      
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div 
            key={todo.id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <div className="todo-subject-container">
              <div 
                className="subject-circle"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                <span className="subject-letter">
                  {getSubjectInitial(todo.subject)}
                </span>
              </div>
            </div>
            
            <div className="todo-details">
              <h3 className="todo-subject">{todo.subject}</h3>
              <p className="todo-time">{todo.timeStart} - {todo.timeEnd}</p>
              <p className="todo-description">{todo.description}</p>
              <div className="todo-meta">
                <span className={`priority-badge ${todo.priority}`}>
                  {todo.priority}
                </span>
              </div>
            </div>
            
            <div className="todo-actions">
              <p className="todo-today">{todo.today}</p>
              <button 
                className="todo-checkbox"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? (
                  <CheckCircle size={24} className="check-icon completed" />
                ) : (
                  <Circle size={24} className="check-icon" />
                )}
              </button>
            </div>
          </div>
        ))}
        
        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No tasks found</h3>
            <p className="empty-description">
              {filter === 'all' 
                ? 'Add your first task to get started!'
                : `No ${filter} tasks at the moment.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoListScreen