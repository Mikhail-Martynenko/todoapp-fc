import React from 'react';
import styled from 'styled-components';
import {TaskButton} from "./primitives/buttonStyled";
import {CheckboxInput} from "./primitives/checkboxStyled";
import {useAppDispatch} from "../redux/hooks";
import {deleteTask, editTask, toggleTask} from "../redux/slices/taskSlice";


const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #1890ff;
`;

const TaskId = styled.span`
  margin-right: 5px;
`;

const TaskTitle = styled.span<{ isComplete: boolean }>`
  text-decoration: ${(props) => (props.isComplete ? 'line-through' : 'none')};
  font-size: 18px;
`;

interface ITaskProps {
    task: {
        id: number;
        title: string;
        isComplete: boolean;
    };
}

const Task: React.FC<ITaskProps> = ({task}) => {
    const dispatch = useAppDispatch()
    return (
        <TaskContainer>
            <TaskId>{task.id}:</TaskId>
            <CheckboxInput type="checkbox" checked={task.isComplete} onChange={() => dispatch(toggleTask(task.id))} />
            <TaskTitle isComplete={task.isComplete}>{task.title}</TaskTitle>
            <TaskButton onClick={() => dispatch(deleteTask(task.id))}>Delete</TaskButton>
            <TaskButton onClick={() => dispatch(editTask(task.id))}>Edit</TaskButton>
        </TaskContainer>
    );
};

export default Task;
