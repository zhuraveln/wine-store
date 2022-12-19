import { createSlice } from '@reduxjs/toolkit'
import { Status } from '../wine/types'
import { signIn, signUp } from './asyncActions'
import { AuthSliceState } from './types'

const initialState: AuthSliceState = {
  userData: null,
  status: Status.SUCCESS
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.userData = null
      state.status = Status.SUCCESS
    }
  },
  extraReducers: builder => {
    // Sign Up
    builder.addCase(signUp.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(signUp.rejected, state => {
      state.status = Status.ERROR
    })

    // Sign In
    builder.addCase(signIn.pending, state => {
      state.status = Status.LOADING
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.userData = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(signIn.rejected, state => {
      state.status = Status.ERROR
    })
  }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer
