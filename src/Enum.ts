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
  DOCUMENTS = 'documents',
  VERIFY_COMPANY_DOCUMENTS = 'verify_company_documents',
  VERIFY_STUDENT_DOCUMENTS = 'verify_student_documents',
  CONTACTS = 'contacts'
}

export enum ModalType {
  REFUS = 'refus',
  ACCEPT = 'accept',
  DELETE = 'delete',
  DELETE_GROUP = 'delete_group',
  NOTATION = 'notation',
  COMMENT = 'comment',
  LEAVE = 'leave',
  EXCLUSION = 'exclusion',
  DELETE_ACCOUNT = 'delete_account',
  DEACTIVATE_ACCOUNT = 'deactivate_account'
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

export enum NotificationType {
  MESSAGE,
  GROUP,
  MISSION,
  DOCUMENT,
}
