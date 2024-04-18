import type { AnyObject } from 'chart.js/dist/types/basic'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class LinkedInApi {
  static async updateProfile (jwtToken: string, dto: AnyObject): Promise<string> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/linkedin`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
}

export default LinkedInApi
