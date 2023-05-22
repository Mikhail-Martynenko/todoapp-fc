import React, {useState} from 'react';
import {TaskButton} from "./primitives/buttonStyled";
import {Tasks} from "../domain/MyTask";

interface FieldEditProps {
    tasks: Tasks;
    editingTaskId: number | null;
    handleCancelEdit: () => void;
    handleSave: (id: number | null, updatedTask: { title: string; isComplete?: boolean }) => void;
}

const FieldEdit: React.FC<FieldEditProps> = ({tasks, editingTaskId, handleSave, handleCancelEdit}) => {

    const [inputValue, setInputValue] = useState<string>('')
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
    const handleSaveClick = () => {
        const updatedTask = {
            ...tasks.find(task => task.id === editingTaskId),
            title: inputValue,
        };
        handleSave(editingTaskId, updatedTask);
    };

    return (
        <div>
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <TaskButton onClick={handleCancelEdit}>Cancel</TaskButton>
            <TaskButton onClick={handleSaveClick}>Save</TaskButton>
        </div>
    );
};

export default FieldEdit;