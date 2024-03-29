export enum DashboardState {
  DASHBOARD = 'dashboard',
  MISSION = 'mission',
  FACTURES = 'factures',
  PROFIL = 'profil',
  DOCUMENTS = 'documents',
  STATISTICS = 'statistics',
  GROUP = 'group',
}

export enum AdminDashboardState {
  DASHBOARD = 'dashboard',
  USERS = 'users',
  MISSIONS = 'missions',
  DOCUMENTS = 'documents'
}

export enum ModalType {
  REFUS = 'refus',
  ACCEPT = 'accept',
  DELETE = 'delete',
  DELETE_GROUP = 'delete_group',
  NOTATION = 'notation',
  COMMENT = 'comment',
  LEAVE = 'leave'
}

export enum MissionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  PROVISIONED = 'PROVISIONED',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}

export enum TaskStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED'
}
