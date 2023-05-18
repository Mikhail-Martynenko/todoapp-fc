import {CaseReducer, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {deleteTask, setTasksArray} from "./taskSlice";

const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/`

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${URL_PATH}?_limit=10`);
            if (!response.ok) {
                throw new Error('Server error')
            }
            const tasks = await response.json();
            dispatch(setTasksArray(tasks))
            console.log(tasks, 'Запрос прошёл успешно!')
            return tasks;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchDeleteTask = createAsyncThunk(
    'tasks/fetchTasks',
    async (id: number, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${URL_PATH}${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Cant delete task. Server error')
            }
            console.log(response)
            dispatch(deleteTask(id))
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface FetchState {
    statusLoading: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: any
}

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

const rejectedReducer: CaseReducer<FetchState, any> = (state, action) => {
    state.statusLoading = 'rejected';
    state.error = action.payload;
};

const fetchSlice = createSlice({
    name: 'fetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, pendingReducer);
        builder.addCase(fetchTasks.fulfilled, fulfilledReducer);
        builder.addCase(fetchTasks.rejected, rejectedReducer);
    },
});

export const fetchSelector = (state: RootState) => state.fetchReducer;
export default fetchSlice.reducer