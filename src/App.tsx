import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import FieldEdit from "./components/FieldEdit";


const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

interface ITasks {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
    editingTaskId?: number | null
}

const App: React.FC = () => {

    const [tasksState, setStateTasks] = useState<ITasks>({
        tasks: [],
        editingTaskId: null
    })

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect((): void => {
        try {
            (async () => {
                const response = await fetch(URL_PATH);
                if (response.ok) {
                    const tasks = await response.json();
                    console.log('Запрос прошёл успешно!')
                    // setStateTasks(() => ({
                    //     tasks: [...tasks.slice(0, 5)]
                    // }));
                }
            })()
        } catch (error) {
            console.log(error)
        }
    }, [])


    const addTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        if (inputRef.current?.value) {
            const newTask = {
                id: tasksState.tasks.length + 1,
                title: inputRef.current.value,
                isComplete: false
            };
            setStateTasks((prevState) => ({tasks: [...prevState.tasks, newTask]}));
            inputRef.current.value = '';
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'DELETE',
            });
            console.log(response, 'DELETE')
        } catch (error) {
            console.log(error)
        }

        setStateTasks(prevState => ({
            tasks: prevState.tasks.filter(task => task.id !== id).map((task, index) => ({...task, id: index + 1}))
        }));

    };

    const handleToggleTask = async (id: number) => {
        try {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: 'foo',
                    completed: true,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response, "PUT handleToggleTask")
        } catch (error) {
            console.log(error)
        }
        setStateTasks((prevState) => ({
            tasks: prevState.tasks.map(task => task.id === id ? {...task, isComplete: !task.isComplete} : task)
        }));
    };


    const handleEditClick = (taskId: number) => {
        setStateTasks((prevState) => ({
            ...prevState,
            editingTaskId: taskId,
        }));
    };

    const handleSave = (id: number | null, updatedTask: { title: string; isComplete?: boolean }) => {
        const updatedTasks = tasksState.tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    title: updatedTask.title,
                    isComplete: updatedTask.isComplete !== undefined ? updatedTask.isComplete : task.isComplete,
                };
            }
            return task;
        });

        setStateTasks({tasks: updatedTasks});
    };
    const handleCancelEdit = () => {
        setStateTasks((prevState) => ({
            ...prevState,
            editingTaskId: null,
        }));
    };

    const handleToggleAll = async () => {
        const allComplete = tasksState.tasks.every(task => task.isComplete);

        setStateTasks((prevState) => ({
            tasks: prevState.tasks.map(task => ({
                        ...task,
                        isComplete: !allComplete
                    }
                )
            )
        }));
        try {
            const response = await fetch(URL_PATH, {
                method: 'PUT',
                body: JSON.stringify({
                    completed: !allComplete,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            console.log(response, 'PUT handleToggleAll');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCompleted = () => {
        setStateTasks(prevState => {
            const remainingTasks = prevState.tasks.filter(task => !task.isComplete);
            return {
                tasks: remainingTasks.map((task, index) => ({...task, id: index + 1})),
            };
        });
    };


    return (
        <div className="App">
            <h1>Task List</h1>
            <form>
                <input type="text" placeholder="Enter task name" ref={inputRef} />
                <button onClick={addTask}>Add</button>
            </form>

            <TaskList
                tasks={tasksState.tasks} onDelete={handleDeleteTask} onToggle={handleToggleTask}
                onEdit={handleEditClick}
            />
            {tasksState.editingTaskId !== null && tasksState.editingTaskId !== undefined && (
                <FieldEdit
                    tasks={tasksState.tasks}
                    editingTaskId={tasksState.editingTaskId}
                    handleCancelEdit={handleCancelEdit}
                    handleSave={handleSave}
                />
            )}
            {tasksState.tasks.length !== 0 && (
                <div>
                    <button onClick={handleToggleAll}>Toggle All</button>
                    <button onClick={handleDeleteCompleted}>Delete Completed</button>
                </div>
            )}
        </div>
    );
}

export default App;
