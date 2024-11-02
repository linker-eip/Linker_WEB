import type { AnyObject } from 'chart.js/dist/types/basic'
import type { Notifications, StudentPreferences } from '../Typage/NotificationType'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class NotificationApi {
  static async getNotifications (jwtToken: string): Promise<Notifications[]> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la récupération de vos notifications')
    }
    return response.data
  }

  static async removeNotification (jwtToken: string, id: number): Promise<Notifications> {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL as string}/api/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la suppression de votre notification')
    }
    return response.data
  }

  static async changeNotificationStatus (jwtToken: string, dto: AnyObject): Promise<string> {
    const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/notifications`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la modification du statut de votre notification')
    }
    return response.data
  }

  static async changeStudentNotificationPreferences (jwtToken: string, dto: AnyObject): Promise<string> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/student/preferences`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la modification de vos préférences de notification')
    }
    return response.data
  }

  static async getStudentPreferences (jwtToken: string): Promise<StudentPreferences> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/student/preferences`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la récupération de vos préférences de notification')
    }
    return response.data
  }

  static async changeCompanyNotificationPreferences (jwtToken: string, dto: AnyObject): Promise<string> {
    const response = await axios.put(`${process.env.REACT_APP_API_URL as string}/api/company/preferences`, dto, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la modification de vos préférences de notification')
    }
    return response.data
  }

  static async getCompanyPreferences (jwtToken: string): Promise<StudentPreferences> {
    const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/company/preferences`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    if (response.status !== 200 && response.status !== 201) {
      alert('Une erreur est survenue lors de la récupération de vos préférences de notification')
    }
    return response.data
  }
}

export default NotificationApi
