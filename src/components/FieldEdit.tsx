import React, {useState} from 'react';

interface IFieldEditProps {
    tasks: {
        id: number;
        title: string;
        isComplete: boolean;
    }[];
    editingTaskId: number | null;
    handleCancelEdit: () => void;
    handleSave: (id: number | null, updatedTask: { title: string; isComplete?: boolean }) => void;
}

const FieldEdit: React.FC<IFieldEditProps> = ({tasks, editingTaskId, handleSave, handleCancelEdit}) => {

    const [inputValue, setInputValue] = useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSaveClick = () => {
        const updatedTask = {
            ...tasks.find(task => task.id === editingTaskId),
            title: inputValue,
        };
        handleSave(editingTaskId, updatedTask);
    };


    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={handleCancelEdit}>Cancel</button>
            <button onClick={handleSaveClick}>Save</button>
        </div>
    );
};

export default FieldEdit;