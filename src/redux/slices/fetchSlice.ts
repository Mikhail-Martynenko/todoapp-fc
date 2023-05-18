import {AnyAction, CaseReducer, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../store";
import {addTask, deleteTask, ITask, ITasksState, setTasksArray, toggleAll, toggleTask, updateTask} from "./taskSlice";

const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

interface IFetchTasksExtraThunkArg {
    rejectValue: string;
    dispatch: AppDispatch;
    state: RootState;
}

interface FetchState {
    statusLoading: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: string | null
}

export const fetchTasks = createAsyncThunk<ITask[], undefined, IFetchTasksExtraThunkArg>(
    'tasks/fetchTasks',
    async (_, {rejectWithValue, dispatch}) => {
        const response = await fetch(`${URL_PATH}?_limit=10`);
        if (!response.ok) {
            return rejectWithValue('Server error')
        }
        const tasks = await response.json();
        dispatch(setTasksArray(tasks))
        console.log(tasks, 'Запрос прошёл успешно!')
        return tasks as ITask[];
    }
);

export const fetchAddNewTask = createAsyncThunk<ITask, string, IFetchTasksExtraThunkArg>(
    'tasks/fetchAddNewTask',
    async (text, {rejectWithValue, dispatch,}) => {
        const newTask = {
            userId: 1,
            title: text,
            isComplete: false
        };
        const response = await fetch(`${URL_PATH}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newTask)
        });
        if (!response.ok) {
            return rejectWithValue('Cant add task. Server error')
        }
        dispatch(addTask(text))
        const data = await response.json();
        console.log("Задача добавлена", data)
        return data;
    }
);

export const fetchDeleteTask = createAsyncThunk<ITask[], number, { rejectValue: string }>(
    'tasks/fetchDeleteTask',
    async (id, {rejectWithValue, dispatch}) => {
        const response = await fetch(`${URL_PATH}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            return rejectWithValue('Cant delete task. Server error')
        }
        console.log(response)
        dispatch(deleteTask(id))
        return [];
    }
)

export const fetchToggleTask = createAsyncThunk<ITask, number, IFetchTasksExtraThunkArg>(
    'tasks/fetchToggleTask',
    async (id, {rejectWithValue, dispatch, getState}) => {

        const task: ITask | undefined = getState().taskReducer.tasks.find(task => task.id === id)
        if (task) {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    completed: !task.isComplete
                })
            });
            if (!response.ok) {
                return rejectWithValue('Cant delete task. Server error')
            }
            const data = await response.json();
            console.log('Toggle - success', data)
            dispatch(toggleTask(id))
            return data as ITask
        }
        return rejectWithValue('No such task')
    }
)

export const fetchToggleAllTask = createAsyncThunk<ITask[], undefined, IFetchTasksExtraThunkArg>(
    'tasks/fetchToggleAllTask',
    async (_, {rejectWithValue, dispatch, getState}) => {
        const allComplete = getState().taskReducer.tasks.every(task => task.isComplete);
        const response = await fetch(URL_PATH + '/all', {
            method: 'PATCH',
            body: JSON.stringify({
                completed: !allComplete,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            return rejectWithValue('Cant toggle all tasks. Server error')
        }
        dispatch(toggleAll())
        const data = await response.json();
        console.log(data, "Toggle all -success")
        return data;
    }
)

interface IUpdateTaskPayload {
    id: number | null;
    updatedTask: {
        title: string,
        isComplete: boolean
    };
}

export const fetchUpdateTask = createAsyncThunk<ITask[], IUpdateTaskPayload, IFetchTasksExtraThunkArg>(
    'tasks/fetchUpdateTask',
    async ({id, updatedTask}, {rejectWithValue, dispatch, getState}) => {

        const response = await fetch(`${URL_PATH}${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            return rejectWithValue('Cant edit task. Server error')
        }
        const data = await response.json();
        dispatch(updateTask({id, updatedTask}))
        console.log("Edit - success", data)
        return data;
    }
)


const initialState: FetchState = {
    statusLoading: 'idle',
    error: null
}

const pendingReducer: CaseReducer<FetchState> = (state) => {
    state.statusLoading = 'loading';
};

const fulfilledReducer: CaseReducer<FetchState> = (state) => {
    state.statusLoading = 'fulfilled';
};

const rejectedReducer: CaseReducer<FetchState, PayloadAction<string>> = (state, action) => {
    state.statusLoading = 'rejected';
    state.error = action.payload;
};

const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, pendingReducer)
            .addCase(fetchTasks.fulfilled, fulfilledReducer)
            .addMatcher(isError, rejectedReducer)
    },
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

export const fetchSelector = (state: RootState) => state.fetchReducer;
export default fetchSlice.reducer