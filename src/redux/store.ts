import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import fetchReducer from './slices/fetchSlice'

export const store = configureStore({
    reducer: {
        taskReducer,
        fetchReducer
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch