import { type NotificationType } from '../Enum'

export interface Notifications {
  id: number
  title: string
  text: string
  enTitle?: string | null
  enText?: string | null
  type: NotificationType
  studentId: number
  companyId: number | null
  isDeleted: boolean
  alreadySeen: boolean
  date: string
}

export interface StudentPreferences {
  mailNotifMessage: boolean
  mailNotifGroup: boolean
  mailNotifMission: boolean
  mailNotifDocument: boolean
}
