import React from 'react';
import Task from "./Task";

interface ITaskListProps {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
}

const TaskList: React.FC<ITaskListProps> = ({tasks}) => {
    return (

        <div>
            {tasks.map((task) =>
                <Task key={task.id} task={task} />
            )}
        </div>
    );
};

export default TaskList;