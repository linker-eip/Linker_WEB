import axios from 'axios'
import { type Group } from '../Typage/Type'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class GroupApi {
  static async getGroup (jwtToken: string): Promise<Group> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      return error
    }
  }
}

export default GroupApi
