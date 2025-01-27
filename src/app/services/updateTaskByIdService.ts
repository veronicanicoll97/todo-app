import ITask from "../interfaces/ITask";
import ITaskUpdate from "../interfaces/ITaskUpdate";

export default function updateTaskByIdService (
    taskId: string,
    dataToUpdate: ITaskUpdate,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) {
    const URL = `http://localhost:5000/tasks/${taskId}`;
    fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
    })
        .then((response) => response.json()) // Parseamos la respuesta como JSON
        .then((data: ITask[]) => {
            // Aseguramos que `data` sea un array de ITask
            setTasks(data); // Actualizamos el estado con el array de tareas
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        });
}