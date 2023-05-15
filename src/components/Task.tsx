import React from 'react';

interface ITaskProps {
    task: {
        id: number;
        title: string;
        isComplete: boolean;
    };
}

const Task: React.FC<ITaskProps> = ({task}) => {

    return (
        <div key={task.id}>
            {/*<input type="checkbox" checked={task.isComplete} />*/}
            <span style={{textDecoration: task.isComplete ? 'line-through' : 'none'}}>{task.title}</span>
            <button>Delete</button>
            <button>Edit</button>
        </div>
    );
};

export default Task;