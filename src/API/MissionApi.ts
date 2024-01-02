import axios from 'axios'
import type { CompanyMissionDetails, MissionTaskInfo } from '../Typage/Type'
import { TaskStatus } from '../Enum'

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

  static async getStudentDetailedMission (jwtToken: string, missionId: string): Promise<CompanyMissionDetails> {
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

  static async createTask (jwtToken: string, missionId: number, data: any): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${missionId}`, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
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

  static async deleteTask (jwtToken: string, taskId: number): Promise<MissionTaskInfo> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/mission/task/${taskId}`, {
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

  static async finishMission (jwtToken: string, missionId: number): Promise<MissionTaskInfo> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/mission/finish/${missionId}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }
}

export default MissionApi
