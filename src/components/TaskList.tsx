import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import {useSelector} from "react-redux";
import {taskSelector} from "../redux/slices/taskSlice";

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TaskList: React.FC = () => {
    const {tasks} = useSelector(taskSelector)
    return (
        <TaskListContainer>
            {tasks.map((task) => <Task key={task.id} task={task} />)}
        </TaskListContainer>
    );
};

export default TaskList;
