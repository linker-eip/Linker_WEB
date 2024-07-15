import axios, { type AxiosError } from 'axios'

export interface AuthResponse {
  status: number
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class AuthApi {
  static async verifyStudentPassword (code: string): Promise<AuthResponse> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/student/verify?code=${code}`)
    return response
  }

  static async changeStudentPassword (jwtToken: string, data: any): Promise<string> {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/student/change-password`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ statusCode: number, message: string }>
        if (axiosError.response?.data.statusCode === 401) {
          return (axiosError.response?.data.message)
        }
      }
    }
    return ''
  }

  static async changeCompanyPassword (jwtToken: string, data: any): Promise<string> {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL as string}/api/auth/company/change-password`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ statusCode: number, message: string }>
        if (axiosError.response?.data.statusCode === 401) {
          return (axiosError.response?.data.message)
        }
      }
    }
    return ''
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
