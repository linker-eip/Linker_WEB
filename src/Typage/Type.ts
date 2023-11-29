export interface GroupError {
  data: {
    message: string
    statusCode: number
  }
  status: number
}

export interface GroupType {
  name: string
  description: string
  picture: string
  membersIds: [
    string
  ]
  leaderId: 0
  isLeader: true
}

export interface Group {
  data?: GroupType
  response?: GroupError
}
