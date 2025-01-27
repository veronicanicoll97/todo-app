import ITask from "../interfaces/ITask";

export default function getTaskByIdService (
    taskId: string,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) {
    const URL = `http://localhost:5000/tasks/${taskId}`;
    fetch(URL,)
        .then((response) => response.json()) // Parseamos la respuesta como JSON
        .then((data: ITask[]) => {
            // Aseguramos que `data` sea un array de ITask
            setTasks(data); // Actualizamos el estado con el array de tareas
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        });
}