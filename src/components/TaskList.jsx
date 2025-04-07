import React, { useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { DragDropWrapper } from './DragDropWrapper';

export function TaskList({ filter }) {
  const { tasks } = useTasks();

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div className="task-list-container">
      <DragDropWrapper tasks={filteredTasks} />
    </div>
  );
}