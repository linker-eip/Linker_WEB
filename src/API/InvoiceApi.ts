import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class InvoiceApi {
  private static handleError (message: string): void {
    enqueueSnackbar(message, { variant: 'error' })
  }

  static async getInvoicesForStudent (jwtToken: string): Promise<any> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/invoice/student`, {
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

  static async getInvoicesForCompany (jwtToken: string): Promise<any> {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL as string}/api/invoice/company`, {
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
}

export default InvoiceApi
