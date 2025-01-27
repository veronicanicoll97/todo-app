import ITask from '@/app/interfaces/ITask';
import React, { useState } from 'react'

type FilterTaskProps = {
  tasks: ITask[]; 
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string, completed: boolean, title: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const FilterTask: React.FC<FilterTaskProps> = ({
  tasks, deleteTask, toggleTaskCompletion, setTasks
}) => {
  console.log("tasks: ", tasks)

  const [filter, setFilter] = useState('all'); // all, active, completed
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };
  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }) : [];
  return (
    <div>
        <ul className="bg-gray-800 rounded-md p-4 shadow-lg">
          {filteredTasks.map((task: ITask) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-2 py-2 border-b border-gray-700 last:border-b-0">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, !task.completed, task.title)}
                  className="w-5 h-5"
                />
                <span className={
                  `text-sm ${task.completed ? 'line-through text-gray-500' : ''}`
                }>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-600">
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm">{tasks.filter(task => !task.completed).length} items left</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={
                `text-sm ${filter === 'all' ? 'font-bold text-white' : 'text-gray-400'}`
              }>
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={
                `text-sm ${filter === 'active' ? 'font-bold text-white' : 'text-gray-400'}`
              }>
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={
                `text-sm ${filter === 'completed' ? 'font-bold text-white' : 'text-gray-400'}`
              }>
              Completed
            </button>
          </div>
          <button
            onClick={clearCompleted}
            className="text-sm text-red-500 hover:text-red-600">
            Clear Completed
          </button>
        </div>
      </div>
  )
}

export default FilterTask