import React, {useEffect, useState, useRef} from 'react'
import ITask from '@/app/interfaces/ITask';
import getAllTasksService from '@/app/services/getAllTasksService';
import deleteTaskByIdService from '@/app/services/deleteTaskByIdService';
import ListTaskSection from '../listTasks/ListTaskSection';
import updateTaskByIdService from '@/app/services/updateTaskByIdService';
import ITaskUpdate from '@/app/interfaces/ITaskUpdate';

// type Props = {
//     tasks: ITask[]; 
//     deleteTask: React.Dispatch<React.SetStateAction<string>>; 
//     toggleTaskCompletion: React.Dispatch<React.SetStateAction<string>>;
//     setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
// }


const HomeToDo = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const toggleTaskCompletion = (id: string, completed: boolean, title: string) => {
    const dataToUpdate: ITaskUpdate = {
      title, completed
    }
    updateTaskByIdService(
      id,
      dataToUpdate,
      setTasks
    )
  };

  const timeoutGet = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Obtener el listado de tareas
  useEffect(() => {
    timeoutGet.current = setTimeout(() => {
      getAllTasksService(setTasks)
    }, 1000)
  }, [])

  const timeoutDelete = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string>('');
    useEffect(
      () => {
        if(taskIdToDelete != '') 
          timeoutDelete.current = setTimeout(() => {
            deleteTaskByIdService(
              taskIdToDelete,
              setTasks
            )
          }, 1000)
        // Limpiar el timeout si taskIdToDelete cambia o el componente se desmonta
        return () => {
          if (timeoutDelete.current) {
            clearTimeout(timeoutDelete.current);
          }
        };
      }, [taskIdToDelete]
    )

  const deleteTask = (id: string) => {
    setTaskIdToDelete(id)
  };

  console.log("to delete: ", taskIdToDelete)

  return (
    <div>
      <ListTaskSection
      deleteTask={deleteTask}
      setTasks={setTasks}
      tasks={tasks}
      toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  )
}

export default HomeToDo