import React from 'react';
import styled from 'styled-components';
import Task from './Task';

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

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const TaskList: React.FC<ITaskListProps> = ({tasks, onDelete, onToggle, onEdit}) => {
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
