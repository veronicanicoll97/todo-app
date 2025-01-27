import ITask from '@/app/interfaces/ITask';
import ITaskCreate from '@/app/interfaces/ITaskCreate';
import createTaskService from '@/app/services/createTaskService';
import React, {useEffect, useState, useRef} from 'react'

// Definir el tipo para las propiedades del componente
type AddTaskSectionProps = {
  tasks: ITask[]; // O también puedes usar ITask[] | ITaskCreate[]
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
};

const AddTaskSection:  React.FC<AddTaskSectionProps> = ({tasks, setTasks}) => {
  const initialValue: ITaskCreate = {
    title: ''
  }
  
  const [newTask, setNewTask] = useState<ITaskCreate>(initialValue);

  const addTask = () => {
    if (newTask.title.trim() !== '') {
      setTasks([...tasks,  {title: '', id: '', completed: false}]);
      setNewTask(initialValue);
    }
  };

  const timeoutPost = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if(newTask.title != '')
      timeoutPost.current = setTimeout(() => {
        createTaskService(
          newTask,
          setTasks
        )
      }, 1000)
  }, [newTask, setTasks])

  const handleKeyPress = (event: React.KeyboardEvent) => {
    console.log(event.key)
    if (event.key === 'Enter') {
      addTask();
    }
  };  

  return (
    <div>
        <div className="font-Josefin flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Currently typing"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addTask}
            className="bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
            Add
          </button>
        </div>
    </div>
  )
}

export default AddTaskSection