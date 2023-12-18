export interface GroupError {
  data: {
    message: string
    statusCode: number
  }
  status: number
}

export interface Members {
  firstName: string
  lastName: string
  picture: string
  isLeader: boolean
  id: number
}

export interface GroupType {
  name: string
  description: string
  picture: string
  members: Members[]
  leaderId: number
  isLeader: boolean
}

export interface Group {
  data?: GroupType
  response?: GroupError
}

export interface InvitedMember {
  id: number
  name: string
  picture: string
}

export interface GroupeInvitedMember {
  data?: InvitedMember[]
  response?: GroupError
}

export interface SearchMember {
  id: number
  email: string
  firstName: string
  lastName: string
  picture: string
}

export interface GroupSearchMember {
  data?: SearchMember[]
  response?: GroupError
}

export interface MissionDetails {
  id: number
  name: string
  status: string
  description: string
  companyId: number
  groupId: number
  startOfMission: string
  endOfMission: string
  createdAt: string
  amount: number
  skills: string
}
