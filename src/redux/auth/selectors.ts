import { RootState } from '../store'

export const userDataSelector = (state: RootState) => state.auth.userData

export const authSelector = (state: RootState) => state.auth
