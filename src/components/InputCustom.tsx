import React, {useRef} from 'react';
import {FormContainer, InputField} from "./primitives/formStyled";
import {TaskButton} from "./primitives/buttonStyled";
import {useAppDispatch} from "../redux/hooks";
import {fetchAddNewTask} from "../redux/slices/fetchSlice";

const InputCustom: React.FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch()
    const handleAddTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {

        e.preventDefault()

        if (!inputRef.current?.value) return;

        dispatch(fetchAddNewTask(inputRef.current.value))
        inputRef.current.value = '';
    };
    return (
        <FormContainer>
            <InputField type="text" placeholder="Enter task name" ref={inputRef} />
            <TaskButton onClick={handleAddTask}>Add</TaskButton>
        </FormContainer>
    );
};

export default InputCustom;