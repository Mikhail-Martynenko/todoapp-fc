import React from 'react';
import {TaskButton} from "./primitives/buttonStyled";
import {CheckboxInput} from "./primitives/checkboxStyled";
import {useAppDispatch} from "../redux/hooks";
import {editTask, Task} from "../redux/slices/taskSlice";
import {fetchDeleteTask, fetchToggleTask} from "../redux/slices/fetchSlice";
import {TaskContainer, TaskId, TaskTitle} from "../styles";

interface TaskProps {
    task: Task;
}

const TaskView: React.FC<TaskProps> = ({task}) => {
    const dispatch = useAppDispatch()
    const isChecked = task.isComplete ?? false;

    return (
        <TaskContainer>
            <TaskId>{task.id}:</TaskId>
            <CheckboxInput type="checkbox" checked={isChecked} onChange={() => dispatch(fetchToggleTask(task.id))} />
            <TaskTitle isComplete={task.isComplete}>{task.title}</TaskTitle>
            <TaskButton onClick={() => dispatch(fetchDeleteTask(task.id))}>Delete</TaskButton>
            <TaskButton onClick={() => dispatch(editTask(task.id))}>Edit</TaskButton>
        </TaskContainer>
    );
};

export default React.memo(TaskView);
