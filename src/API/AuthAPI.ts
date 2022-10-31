import axios from 'axios'

export default class AuthAPI {
  // Sign Up
  static async signUp(name: string, password: string) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_AUTH}/auth/sign-up`,
      {
        name,
        password
      }
    )

    return response.data
  }
  // Sign In
  static async signIn(name: string, password: string) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_AUTH}/auth/sign-in`,
      {
        name,
        password
      }
    )

    return response.data
  }
}
