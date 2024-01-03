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

export interface CompanyInfo {
  id: number
  name: string
  description: string
  email: string
  phone: string
  address: string
  size: number
  location: string
  activity: string
  speciality: string
  website: string
  picture: string
}

export interface MissionInfo {
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

export interface MissionTaskArrayInfo {
  missionTask: MissionTaskInfo
  studentProfile: StudentProfileInfo[]
}

export interface MissionTaskInfo {
  id: number
  name: string
  description: string
  studentId: number
  missionId: number
  amount: number
  skills: string
  status: string
  createdAt: string
}

export interface StudentProfileInfo {
  id: number
  studentId: number
  firstName: string
  lastName: string
  description: string
  email: string
  phone: string
  location: string
  picture: string
  website: string
  note: number
}

export interface CompanyMissionDetails {
  companyProfile: CompanyInfo
  mission: MissionInfo
  missionTaskArray: MissionTaskArrayInfo[]
  group: GroupInfo
  groupStudents: GroupStudentInfo[]
}

export interface GroupInvitation {
  id: number
  name: string
  picture: string
  leaderName: string
}

export interface GroupInvitationData {
  data?: GroupInvitation[]
  response?: GroupError
}

export interface GroupInfo {
  name: string
  description: string
  picture: string
  members: Members[]
  leaderId: number
  isLeader: boolean
}

export interface GroupStudentInfo {
  id: number
  studentId: number
  firstName: string
  lastName: string
  description: string
  email: string
  phone: string
  location: string
  picture: string
  website: string
  note: number
}

export interface StudentMissionDetails {
  mission: MissionInfo
  missionTaskArray: MissionTaskArrayInfo[]
  group: GroupInfo
  groupStudents: GroupStudentInfo[]
}

export interface CompanyAdminInfo {
  id: number
  email: string
  companyName: string
  phoneNumber: string
  picture: string
  companyPicture: string
  isActive: boolean
  lastConnectedAt: string
  createdAt: string
}
