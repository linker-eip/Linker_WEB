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

  static async VerifyStudentAccount (jwtToken: string): Promise<boolean> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/auth/isVerified`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
}

export default AuthApi
