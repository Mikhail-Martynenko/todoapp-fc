import React from 'react';
import Task from "./Task";

interface ITaskListProps {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
    onEdit: (id: number) => void;
}

const TaskList: React.FC<ITaskListProps> = ({tasks, onDelete, onToggle, onEdit}) => {

    return (
        <div>
            {tasks.map((task) =>
                <Task
                    key={task.id} task={task} onDelete={(id: number) => onDelete(id)}
                    onToggle={(id: number) => onToggle(id)} onEdit={(id: number) => onEdit(id)}
                />
            )}
        </div>
    );
};

export default TaskList;