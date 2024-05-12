import axios from 'axios'
import { type MissionStatus, TaskStatus } from '../Enum'
import type {
  CompanyMissionDetails, MissionTaskInfo, MissionInfo,
  CompanyAdminInfo, StudentMissionDetails, GroupInvitedList,
  PaymentCheckoutResponse
} from '../Typage/Type'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class MissionApi {
  static async getCompanyDetailedMission (jwtToken: string, missionId: string): Promise<CompanyMissionDetails> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/info/${missionId}/company`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getStudentDetailedMission (jwtToken: string, missionId: string): Promise<StudentMissionDetails> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/info/${missionId}/student`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getMissions (jwtToken: string): Promise<CompanyMissionDetails> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getPotentialStudentMissions (jwtToken: string): Promise<MissionInfo[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/student/invitations`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getStudentMissions (jwtToken: string, status: MissionStatus): Promise<MissionInfo[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/student/missions?status=${status}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getStudentMissionInvitations (jwtToken: string, status: MissionStatus): Promise<MissionInfo[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/student/invitations?status=${status}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getCompany (jwtToken: string, companyId: number): Promise<CompanyAdminInfo> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/admin/users/company/${companyId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getGroupList (jwtToken: string, missionId: string): Promise<GroupInvitedList[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/invitedGroups/${missionId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getGroupAcceptedMission (jwtToken: string, missionId: string): Promise<number[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/mission/groupToAccept/${missionId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async uploadSpecifications (jwtToken: string, id: number, dto: FormData): Promise<any> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/mission/${id}`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async createTask (jwtToken: string, missionId: number, data: any): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${missionId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async createTaskAsStudent (jwtToken: string, missionId: number, data: any): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/studentTask/${missionId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async acceptGroupToMission (jwtToken: string, missionId: number, groupId: string): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/acceptGroup/${missionId}/${groupId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async refuseGroupToMission (jwtToken: string, missionId: number, groupId: string): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/refuseGroup/${missionId}/${groupId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async editTask (jwtToken: string, taskId: number, data: any): Promise<MissionTaskInfo> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async editTaskAsStudent (jwtToken: string, taskId: number, data: any): Promise<MissionTaskInfo> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/mission/studentTask/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async deleteTask (jwtToken: string, taskId: number): Promise<MissionTaskInfo> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async deleteTaskAsStudent (jwtToken: string, taskId: number): Promise<MissionTaskInfo> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/mission/studentTask/${taskId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async changeTaskStatus (jwtToken: string, taskId: number): Promise<MissionTaskInfo> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${taskId}`, {
      status: TaskStatus.FINISHED
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async changeStudentTaskStatus (jwtToken: string, taskId: number): Promise<MissionTaskInfo> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${taskId}/status`, {
      status: TaskStatus.FINISHED
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async finishMission (jwtToken: string, missionId: number): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/finish/${missionId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async acceptMission (jwtToken: string, missionId: number, groupId: number): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/accept/${missionId}/${groupId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async refuseMission (jwtToken: string, missionId: number, groupId: number): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/refuse/${missionId}/${groupId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getCompanyMissionCheckout (jwtToken: string, missionId: number): Promise<PaymentCheckoutResponse> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/payment/checkout`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'x-api-key': `${process.env.REACT_STRIPE_SECRET_KEY as string}`,
        'Content-Type': 'application/json'
      },
      params: {
        mission_id: missionId
      }
    })
    return response.data
  }
}

export default MissionApi
