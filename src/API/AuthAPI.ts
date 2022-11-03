import axios from 'axios'

export default class AuthAPI {
  // Sign Up
  static async fetchSignUp(name: string, password: string) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/auth/sign-up`,
      {
        name,
        password
      }
    )

    return response.data
  }
  // Sign In
  static async fetchSignIn(name: string, password: string) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/auth/sign-in`,
      {
        name,
        password
      }
    )

    return response.data
  }
}
