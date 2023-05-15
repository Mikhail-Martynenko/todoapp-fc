import React from 'react';
import styled from 'styled-components';
import {TaskButton} from "./primitives/buttonStyled";
import {CheckboxInput} from "./primitives/checkboxStyled";

interface ITaskProps {
    task: {
        id: number;
        title: string;
        isComplete: boolean;
    };
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

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

const Task: React.FC<ITaskProps> = ({task, onDelete, onToggle, onEdit}) => {
    return (
        <TaskContainer>
            <TaskId>{task.id}:</TaskId>
            <CheckboxInput type="checkbox" checked={task.isComplete} onChange={() => onToggle(task.id)} />
            <TaskTitle isComplete={task.isComplete}>{task.title}</TaskTitle>
            <TaskButton onClick={() => onDelete(task.id)}>Delete</TaskButton>
            <TaskButton onClick={() => onEdit(task.id)}>Edit</TaskButton>
        </TaskContainer>
    );
};

export default Task;
