import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define the initial state using that type
const initialState = {
    user: null,
    token: null,
    status: 'loading'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        create: (state, action: PayloadAction<any>) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.status = action.payload.status
        },
        destroy: (state) => {
            state.user = null
            state.token = null
            state.status = 'unauthenticated'
        },
    },
})

export const { create, destroy } = authSlice.actions
export default authSlice.reducer