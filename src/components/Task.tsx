import React from 'react';

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

const Task: React.FC<ITaskProps> = ({task, onDelete, onToggle, onEdit}) => {

    return (
        <div key={task.id}>
            <input type="checkbox" checked={task.isComplete} onChange={() => onToggle(task.id)} />
            <span style={{textDecoration: task.isComplete ? 'line-through' : 'none'}}>{task.title}</span>
            <button onClick={() => onDelete(task.id)}>Delete</button>
            <button onClick={() => onEdit(task.id)}>Edit</button>
        </div>
    );
};

export default Task;