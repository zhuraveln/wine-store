import { RootState } from '../store'

export const userDataSelector = (state: RootState) => state.auth.userData

export const isAuthSelector = (state: RootState) => Boolean(state.auth.userData)
