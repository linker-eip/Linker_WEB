import axios from 'axios'
import type { Group, GroupeInvitedMember, GroupSearchMember } from '../Typage/Type'

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

  static async createGroup (jwtToken: string, data: FormData): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/group`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
      )
      return response
    } catch (error: any) {
      return error
    }
  }

  static async deleteGroup (jwtToken: string): Promise<Group> {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/group`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      }
      )
      return response
    } catch (error: any) {
      return error
    }
  }

  static async getMemberInvited (jwtToken: string): Promise<GroupeInvitedMember> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group/groupInvites`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      return error
    }
  }

  static async searchMembers (jwtToken: string, value: string): Promise<GroupSearchMember> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/search?searchString=${value}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      return error
    }
  }

  static async inviteMember (jwtToken: string, userId: number): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/group/invite/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      }
      )
      return response
    } catch (error: any) {
      return error
    }
  }
}

export default GroupApi
