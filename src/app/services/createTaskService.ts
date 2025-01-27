import ITask from "../interfaces/ITask";
import ITaskCreate from "../interfaces/ITaskCreate";

export default function createTaskService (
    dataToCreate: ITaskCreate,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) {
    const URL = `http://localhost:5000/tasks`;
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dataToCreate }),
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