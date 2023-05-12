import React, {useEffect, useState} from 'react';
import './App.css';


const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

interface ITasks {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
}

const App: React.FC = () => {

    const [tasksState, setStateTasks] = useState<ITasks>({
        tasks: []
    })

    useEffect((): void => {
        try {
            (async () => {
                const response = await fetch(URL_PATH);
                if (response.ok) {
                    const tasks = await response.json();
                    console.log('Запрос прошёл успешно!')
                    setStateTasks(() => ({
                        tasks: [...tasks.slice(0, 5)]
                    }));
                }
            })()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const addTaskEnter = (title: string) => {
        const newTask = {
            id: tasksState.tasks.length + 1,
            title,
            isComplete: false
        };
        setStateTasks((prevState) => ({tasks: [...prevState.tasks, newTask]}));
    }

    return (
        <div className="App">
            <h1>Task List</h1>
            <input type="text" placeholder="Enter task name" onKeyDown={() => addTaskEnter} />
            <div>{tasksState.tasks.map((task) =>
                <div key={task.id}>
                    <input type="checkbox" checked={task.isComplete} />
                    <span style={{textDecoration: task.isComplete ? 'line-through' : 'none'}}>{task.title}</span>
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            )}</div>
        </div>
    );
}

export default App;
