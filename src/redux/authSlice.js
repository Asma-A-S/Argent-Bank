import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authentification',
    initialState: {
        token: null,
        isAuthenticated: !!localStorage.getItem('token'),
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.token = null
            state.isAuthenticated = false
            sessionStorage.removeItem('token')
        },
    },
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
