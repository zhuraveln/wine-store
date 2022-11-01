import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthAPI from '../../API/AuthAPI'
import { SignUpParams } from './types'

// Sign Up
export const signUp = createAsyncThunk(
  'auth/signUpStatus',
  async (params: SignUpParams) => {
    const { name, password } = params

    const data = await AuthAPI.fetchSignUp(name, password)

    return data
  }
)

// Sign In
export const signIn = createAsyncThunk(
  'auth/signInStatus',
  async (params: SignUpParams) => {
    const { name, password } = params

    const data = await AuthAPI.fetchSignIn(name, password)

    return data
  }
)
