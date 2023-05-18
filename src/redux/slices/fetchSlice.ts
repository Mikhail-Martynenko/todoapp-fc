import {CaseReducer, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {setTasksArray} from "./taskSlice";

const URL_PATH: string = `https://jsonplaceholder.typicode.com/posts/?_limit=10`

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(URL_PATH);
            if (!response.ok) {
                throw new Error('Ошибка сервера')
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