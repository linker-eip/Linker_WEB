import axios from 'axios'

export interface AuthResponse {
  status: number
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class AuthApi {
  static async verifyStudentPassword (code: string): Promise<AuthResponse> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/student/verify?code=${code}`)
    return response
  }
}

export default AuthApi
