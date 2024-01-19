import {createSlice} from '@reduxjs/toolkit'

const TableSlice = createSlice({
    name:'App',
    initialState: {
        data:{}
    },
    reducers: {
        updateData(state, action) 
        {
            state.data[action.payload.key] = action.payload.data
        }
    }

})

export const {updateData} = TableSlice.actions

export default TableSlice.reducer