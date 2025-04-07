import React from 'react';
import { useTasks } from '../context/TaskContext';

export const Task = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className={`task-content ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
      />
      <span className="task-text">{task.text}</span>
      {isHovered && (
        <button
          onClick={() => deleteTask(task.id)}
          className="delete-button"
          aria-label="Delete task"
        >
          ×
        </button>
      )}
    </div>
  );
});