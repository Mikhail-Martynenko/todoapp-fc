import React, {useEffect} from 'react';
import './App.css';
import TaskList from "./components/TaskList";
import FieldEdit from "./components/FieldEdit";
import {TaskButton} from "./components/primitives/buttonStyled";
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {deleteCompletedTasks, taskSelector, toggleAll} from "./redux/slices/taskSlice";
import InputCustom from "./components/InputCustom";
import {fetchDeleteCompletedTasks, fetchSelector, fetchTasks, fetchToggleAllTask} from "./redux/slices/fetchSlice";
import Loader from "./components/Loader/Loader";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const {tasks, editingTaskId} = useAppSelector(taskSelector)
    const {statusLoading, error} = useAppSelector(fetchSelector)

    useEffect((): void => {
        dispatch(fetchTasks())
    }, [])

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
                    <TaskButton onClick={() => dispatch(fetchToggleAllTask())}>Toggle All</TaskButton>
                    <TaskButton onClick={() => dispatch(fetchDeleteCompletedTasks())}>Delete Completed</TaskButton>
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
