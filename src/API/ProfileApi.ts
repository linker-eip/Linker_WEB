
import axios from 'axios'
import type { CompanyInfo } from '../Typage/Type'
import type {
  StudentProfileInfo, Profile, ProfileCompany,
  SkillsListInfo, CompanyDocumentStatusInfo, StudentDocumentStatusInfo,
  StudentStatisticsResponse
} from '../Typage/ProfileType'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ProfileApi {
  static async getProfile (jwtToken: string): Promise<StudentProfileInfo> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/profile`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async deactivateCompanyAccount (jwtToken: string): Promise<void> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/auth/company/disable`, {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async deleteCompanyAccount (jwtToken: string): Promise<void> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/auth/company/delete`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async deactivateStudentAccount (jwtToken: string): Promise<void> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/auth/student/disable`, {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async deleteStudentAccount (jwtToken: string): Promise<void> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/auth/student/delete`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async getSpecificCompanyProfile (jwtToken: string, companyId: number): Promise<CompanyInfo> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/CompanyInfo/${companyId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getCompanyProfile (jwtToken: string): Promise<ProfileCompany> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/company/profile`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getSkillsList (jwtToken: string): Promise<SkillsListInfo> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/skills/list`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async updateProfile (jwtToken: string, dto: FormData): Promise<Profile> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/student/profile`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async updateProfileSkill (jwtToken: string, dto: any): Promise<Profile> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/student/profile`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async updateSkillProfile (jwtToken: string, dto: FormData, id: number): Promise<Profile> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/student/skill/${id}`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async removeSkill (jwtToken: string, id: number): Promise<Profile> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/student/skill/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async removeStudies (jwtToken: string, id: number): Promise<Profile> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/student/studies/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async removeJob (jwtToken: string, id: number): Promise<Profile> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/student/job/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async updateCompanyProfile (jwtToken: string, dto: FormData): Promise<ProfileCompany> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/company/profile`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }

  static async uploadFile (jwtToken: string, dto: FormData): Promise<string> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/document/upload`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async getFile (jwtToken: string, dto: any): Promise<any> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/file`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      params: dto
    })
    return response.data
  }

  static async getCompanyDocumentStatus (jwtToken: string): Promise<CompanyDocumentStatusInfo[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/company/documentStatus`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getStudentDocumentStatus (jwtToken: string): Promise<StudentDocumentStatusInfo[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/documentStatus`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async uploadCompanyDocumentVerification (jwtToken: string, dto: FormData): Promise<any> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/company/documentVerification`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async replaceCompanyDocument (jwtToken: string, dto: FormData): Promise<any> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/company/replaceDocument`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }

  static async uploadStudentDocumentVerification (jwtToken: string, dto: FormData): Promise<any> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/student/documentVerification`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  }

  static async replaceStudentDocument (jwtToken: string, dto: FormData): Promise<any> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/student/replaceDocument`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }

  static async getStudentStatistics (jwtToken: string): Promise<StudentStatisticsResponse> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/statistics/student`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return response.data
  }

  static async getStudentConversations (jwtToken: string): Promise<any> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/chat/student/conversations`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json'
      }
    })
    return response.data
  }

  static async getCompanyConversations (jwtToken: string): Promise<any> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/chat/company/conversations`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        Accept: 'application/json'
      }
    })
    return response.data
  }
}

export default ProfileApi
