import React from 'react';
import AddTaskSection from '../addTasks/AddTaskSection';
import ITask from '@/app/interfaces/ITask';
import FilterTask from '../filterTasks/FilterTask';

type ListTaskProps = {
  tasks: ITask[]; 
  deleteTask: (id: string) => void; 
  toggleTaskCompletion: (id: string, completed: boolean, title: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}


const ListTaskSection: React.FC<ListTaskProps> = ({
  tasks, deleteTask, setTasks, toggleTaskCompletion
}) => {

  return (
    <div className='font-Josefin'>
      <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-700 text-white flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <h1 className="text-4xl font-bold text-center mb-6">TODO</h1>
          <AddTaskSection
            tasks={tasks}
            setTasks={setTasks}
          />
          <FilterTask
            tasks={tasks}
            setTasks={setTasks}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        </div>
      </div>
    </div>
  )
}

export default ListTaskSection