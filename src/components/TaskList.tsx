import React from 'react';
import Task from './Task';
import {Tasks} from "../domain/MyTask";
import {TaskListContainer} from "../styles";

interface TaskListProps {
    tasks: Tasks;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({tasks, onDelete, onToggle, onEdit}) => {
    return (
        <TaskListContainer>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={(id: number) => onDelete(id)}
                    onToggle={(id: number) => onToggle(id)}
                    onEdit={(id: number) => onEdit(id)}
                />
            ))}
        </TaskListContainer>
    );
};

export default TaskList;
