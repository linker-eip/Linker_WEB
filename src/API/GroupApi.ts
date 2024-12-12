import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import type { Group, GroupeInvitedMember, GroupSearchMember, GroupInvitationData, SearchGroups } from '../Typage/Type'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class GroupApi {
  private static handleError (message: string): void {
    enqueueSnackbar(message, { variant: 'error' })
  }

  static async getGroup (jwtToken: string): Promise<Group> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      console.log(error)
      this.handleError(error.response.data.message)
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
      })
      return response
    } catch (error: any) {
      this.handleError(error.response.data.message)
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
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la suppression de votre groupe')
      return error
    }
  }

  static async leaveGroup (jwtToken: string): Promise<Group> {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/group/leave`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la suppression de votre groupe')
      return error
    }
  }

  static async ejectGroup (jwtToken: string, memberId: number): Promise<Group> {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/group/eject/${memberId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de l\'exclusion de ce membre')
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
      this.handleError('Une erreur est survenue lors de la récupération des membres invités')
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
      this.handleError('Une erreur est survenue lors de la recherche de membres')
      return error
    }
  }

  static async searchGroup (jwtToken: string, value: string): Promise<SearchGroups> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group/company/searchGroups?searchString=${value}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la recherche de groupes')
      return error
    }
  }

  static async searchGroupById (jwtToken: string, id: number): Promise<SearchGroups> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group/company/searchGroups?missionId=${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la recherche de groupes')
      return error
    }
  }

  static async inviteMember (jwtToken: string, userId: number): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/group/invite/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de l\'invitation de ce membre')
      return error
    }
  }

  static async inviteGroup (jwtToken: string, missionId: number, groupId: number): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/company/invite/${missionId}/${groupId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de l\'invitation de ce groupe')
      return error
    }
  }

  static async deleteInvitedMember (jwtToken: string, userId: number): Promise<Group> {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/group/invite/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la suppression de l\'invitation de ce membre')
      return error
    }
  }

  static async getGroupInvitation (jwtToken: string): Promise<GroupInvitationData> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/group/invites`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de la récupération des invitations')
      return error
    }
  }

  static async acceptInvitation (jwtToken: string, groupId: number): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/group/invites/accept/${groupId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors de l\'acceptation de l\'invitation')
      return error
    }
  }

  static async refuseInvitation (jwtToken: string, groupId: number): Promise<Group> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/group/invites/refuse/${groupId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      return response
    } catch (error: any) {
      this.handleError('Une erreur est survenue lors du refus de l\'invitation')
      return error
    }
  }
}

export default GroupApi
