import React from 'react';
import {TaskButton} from "./primitives/buttonStyled";
import {CheckboxInput} from "./primitives/checkboxStyled";
import {MyTask} from "../domain/MyTask";
import * as S from './../styles'

interface TaskProps {
    task: MyTask;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({task, onDelete, onToggle, onEdit}) => {
    return (
        <S.TaskContainer>
            <S.TaskId>{task.id}:</S.TaskId>
            <CheckboxInput type="checkbox" checked={task.isComplete} onChange={() => onToggle(task.id)} />
            <S.TaskTitle isComplete={task.isComplete}>{task.title}</S.TaskTitle>
            <TaskButton onClick={() => onDelete(task.id)}>Delete</TaskButton>
            <TaskButton onClick={() => onEdit(task.id)}>Edit</TaskButton>
        </S.TaskContainer>
    );
};

export default Task;
