import React, {useState} from 'react';
import {TaskButton} from "./primitives/buttonStyled";
import {useSelector} from "react-redux";
import {editTask, taskSelector, updateTask} from "../redux/slices/taskSlice";
import {useAppDispatch} from "../redux/hooks";
import {InputField} from "./primitives/formStyled";

const FieldEdit: React.FC = () => {

    const [inputValue, setInputValue] = useState<string>('')
    const {editingTaskId} = useSelector(taskSelector)
    const dispatch = useAppDispatch()

    const handleSaveClick = () => {
        const updatedTask = {
            title: inputValue,
            isComplete: false,
        };
        dispatch(updateTask({id: editingTaskId, updatedTask}));
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