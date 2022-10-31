import { RootState } from '../store'

export const isAuthSelector = (state: RootState) => Boolean(state.auth.userData)
