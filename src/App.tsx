import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import TaskList from "./components/TaskList";


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

    const [inputValue, setInputValue] = useState<string>('')
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
        }
    };


    return (
        <div className="App">
            <h1>Task List</h1>
            <form>
                <input type="text" placeholder="Enter task name" ref={inputRef} />
                <button onClick={addTask}>Add</button>
            </form>

            <TaskList tasks={tasksState.tasks} />
        </div>
    );
}

export default App;
