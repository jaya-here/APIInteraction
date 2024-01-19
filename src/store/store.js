import TableReducer from './../Table/TableSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        table:TableReducer
    }
})