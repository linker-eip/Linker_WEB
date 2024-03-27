import { type NotificationType } from '../Enum'

export interface Notifications {
  id: number
  title: string
  text: string
  type: NotificationType
  studentId: number
  companyId: number | null
  isDeleted: boolean
  alreadySeen: boolean
  date: string
}