import type { Profile } from '../Typage/ProfileType'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ProfileApi {
  static async getProfile (jwtToken: string): Promise<Profile> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/profile`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async updateProfile (jwtToken: string, dto: any): Promise<Profile> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/student/profile`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }
}

export default ProfileApi
