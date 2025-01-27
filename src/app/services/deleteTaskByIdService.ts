import ITask from "../interfaces/ITask";

export default function deleteTaskByIdService (
    taskId: string,
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
) {
    const URL = `http://localhost:5000/tasks/${taskId}`;
    fetch(URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
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