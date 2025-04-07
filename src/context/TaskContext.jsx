import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';
const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const addTask = useCallback((taskText) => {
    if (!taskText.trim()) return;
    
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: Date.now(),
        text: taskText,
        completed: false,
      },
    ]);
  }, [setTasks]);
  
   const toggleTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, [setTasks]);

  const clearCompleted = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, [setTasks]);

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
   
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const value = useMemo(() => ({
    tasks,
    theme,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    reorderTasks,
    toggleTheme,
  }), [tasks, theme, addTask, toggleTask, deleteTask, clearCompleted, reorderTasks, toggleTheme]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}