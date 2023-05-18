import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";


export interface ITask {
    id: number;
    title: string;
    isComplete: boolean;
}

export interface ITasksState {
    tasks: ITask[];
    editingTaskId: number | null,
}

const initialState: ITasksState = {
    tasks: [],
    editingTaskId: null,
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksArray: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: ITask = {
                id: state.tasks.length + 1,
                title: action.payload,
                isComplete: false
            };
            state.tasks.push(newTask)
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks
                .filter(task => task.id !== action.payload)
                .map((task, index) => ({...task, id: index + 1}))
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.map(task => task.id === action.payload ? {
                ...task,
                isComplete: !task.isComplete
            } : task)
        },
        toggleAll: (state) => {
            const allComplete = state.tasks.every(task => task.isComplete);
            state.tasks = state.tasks.map(task => ({
                        ...task,
                        isComplete: !allComplete
                    }
                )
            )
        },
        deleteCompletedTasks: (state) => {
            state.tasks = state.tasks
                .filter(task => !task.isComplete)
                .map((task, index) => ({...task, id: index + 1}))
        },

        editTask: (state, action: PayloadAction<number | null>) => {
            state.editingTaskId = action.payload
        },
        updateTask: (state, action: PayloadAction<{
            id: number | null;
            updatedTask: { title: string, isComplete: boolean }
        }>) => {
            const {id, updatedTask} = action.payload;
            state.tasks = state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        title: updatedTask.title,
                        isComplete: updatedTask.isComplete !== undefined ? updatedTask.isComplete : task.isComplete,
                    };
                }
                return task;
            });
        },
    },
})

export const {
    setTasksArray,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    toggleAll,
    deleteCompletedTasks,
    updateTask
} = taskSlice.actions

export const taskSelector = (state: RootState) => state.taskReducer;

export default taskSlice.reducer