import { Status } from '../wine/types'

export type Data = {
  _id: string
  name: string
  token: string
}

export interface AuthSliceState {
  userData: Data | null
  status: Status
}

export type SignUpParams = {
  name: string
  password: string
}
