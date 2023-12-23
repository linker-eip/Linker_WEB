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

export interface CompanyMissionDetails {
  company: {
    id: 0
    name: string
    description: string
    email: string
    phone: string
    address: string
    size: 0
    location: string
    activity: string
    speciality: string
    website: string
    picture: string
  }
  mission: {
    Id: 0
    name: string
    status: string
    description: string
    companyId: 0
    groupId: 0
    startOfMission: string
    endOfMission: string
    createdAt: string
    amount: 0
    skills: string
  }
  missionTaskArray: [
    {
      missionTasks: [
        {
          id: 0
          name: string
          description: string
          studentId: 0
          missionId: 0
          amount: 0
          skills: string
          status: string
          createdAt: string
        }
      ]
      studentProfile: [
        {
          id: 0
          studentId: 0
          firstName: string
          lastName: string
          description: string
          email: string
          phone: string
          location: string
          picture: string
          website: string
          note: 0
        }
      ]
    }
  ]
  group: {
    name: string
    description: string
    picture: string
    members: [
      {
        firstName: string
        lastName: string
        picture: string
        isLeader: true
        id: 0
      }
    ]
    leaderId: 0
    isLeader: true
  }
  groupStudents: [
    {
      id: 0
      studentId: 0
      firstName: string
      lastName: string
      description: string
      email: string
      phone: string
      location: string
      picture: string
      website: string
      note: 0
    }
  ]
}

export interface GroupInvitation {
  id: 0
  name: string
  picture: string
  leaderName: string
}

export interface GroupInvitationData {
  data?: GroupInvitation[]
  response?: GroupError
}
