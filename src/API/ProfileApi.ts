import type { StudentProfileInfo, Profile, ProfileCompany, SkillsListInfo } from '../Typage/ProfileType'
import type { CompanyInfo } from '../Typage/Type'
import axios from 'axios'

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
        'Content-Type': 'multipart/form-data'
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
}

export default ProfileApi
