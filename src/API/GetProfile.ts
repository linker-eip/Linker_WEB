import type { Profile } from '../Typage/ProfileType'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ProfileApi {
  static async getProfile (jwtToken: string): Promise<Profile> {
    const response = await axios.get('https://api.linker-app.fr/api/student/profile', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }
}

export default ProfileApi
