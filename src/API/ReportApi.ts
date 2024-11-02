import type { AnyObject } from 'chart.js/dist/types/basic'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ReportApi {
  static async createTicket (jwtToken: string, data: AnyObject): Promise<any> {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL as string}/api/ticket`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      })
      return response
    } catch (error: any) {
      alert('Une erreur est survenue lors de la création de votre ticket')
      return error
    }
  }
}

export default ReportApi
