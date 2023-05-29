import React from 'react';
import Task from './Task';
import {taskSelector} from "../redux/slices/taskSlice";
import {useAppSelector} from "../redux/hooks";
import {TaskListContainer} from "../styles";

const TaskList: React.FC = () => {
    const {tasks} = useAppSelector(taskSelector)

    return (
        <TaskListContainer>
            {tasks.map((task) => <Task key={task.id} task={task} />)}
        </TaskListContainer>
    );
};

export default TaskList;
