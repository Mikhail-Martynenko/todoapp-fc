import React, {useState} from 'react';
import {TaskButton} from "./primitives/buttonStyled";
import {editTask, taskSelector} from "../redux/slices/taskSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {InputField} from "./primitives/formStyled";
import {fetchUpdateTask} from "../redux/slices/fetchSlice";

const FieldEdit: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const {editingTaskId} = useAppSelector(taskSelector)
    const dispatch = useAppDispatch()

    const handleSaveClick = () => {
        const updatedTask = {
            title: inputValue,
            isComplete: false,
        };

        dispatch(fetchUpdateTask({id: editingTaskId, updatedTask}));
        dispatch(editTask(null));
    };


    return (
        <div>
            <InputField type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <TaskButton onClick={() => dispatch(editTask(null))}>Cancel</TaskButton>
            <TaskButton onClick={handleSaveClick}>Save</TaskButton>
        </div>
    );
};

export default FieldEdit;