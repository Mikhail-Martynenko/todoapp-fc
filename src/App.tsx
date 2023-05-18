import React, {useEffect} from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import FieldEdit from "./components/FieldEdit";
import {TaskButton} from "./components/primitives/buttonStyled";
import styled from 'styled-components';
import {useAppDispatch} from "./redux/hooks";
import {deleteCompletedTasks, taskSelector, toggleAll} from "./redux/slices/taskSlice";
import {useSelector} from "react-redux";
import InputCustom from "./components/InputCustom";
import {fetchSelector, fetchTasks} from "./redux/slices/fetchSlice";
import Loader from "./components/Loader/Loader";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const {tasks, editingTaskId} = useSelector(taskSelector)
    const {statusLoading, error} = useSelector(fetchSelector)

    useEffect((): void => {
        dispatch(fetchTasks())
    }, [])


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
    };

    const handleToggleAll = async () => {
        const allComplete = tasks.every(task => task.isComplete);
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
        dispatch(toggleAll())
    };
    const handleDeleteCompleted = () => {
        dispatch(deleteCompletedTasks())
    };

    return (
        <AppContainer className="App">
            <h1>Task List</h1>
            <InputCustom />
            {statusLoading === "loading" && <Loader />}
            {error && <h2>{error}</h2>}
            <TaskList />
            {editingTaskId !== null && <FieldEdit />}
            {tasks.length !== 0 && (
                <div>
                    <TaskButton onClick={handleToggleAll}>Toggle All</TaskButton>
                    <TaskButton onClick={handleDeleteCompleted}>Delete Completed</TaskButton>
                </div>
            )}
            {/*<Slider*/}
            {/*    slides={slides}*/}
            {/*    loop*/}
            {/*    navs*/}
            {/*    pages*/}
            {/*    auto*/}
            {/*    stopMouseHover*/}
            {/*    delay={3}*/}
            {/*/>*/}
        </AppContainer>
    );
}

export default App;
