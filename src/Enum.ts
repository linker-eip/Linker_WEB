export enum DashboardState {
  DASHBOARD = 'dashboard',
  MISSION = 'mission',
  FACTURES = 'factures',
  PAIEMENTS = 'paiements',
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
  CONTACTS = 'contacts',
  ARCHIVES = 'archives',
  PAYMENTS = 'payments'
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
  CANCELLED = 'CANCELLED',
  GROUP_ACCEPTED = 'GROUP_ACCEPTED',
}

export enum MissionInviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  GROUP_ACCEPTED = 'GROUP_ACCEPTED',
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

export enum CompanyDocumentType {
  CNI = 'CNI',
  SIRET = 'SIRET',
  KBIS = 'KBIS'
}

export enum StudentDocumentType {
  CNI = 'CNI',
  SIREN = 'SIREN',
  URSSAF = 'URSSAF',
  RIB = 'RIB'
}

export enum DocumentStatus {
  NOT_FILLED,
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  DENIED = 'DENIED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  MISSING_RIB = 'MISSING_RIB',
  WAITING = 'WAITING',
  PAID = 'PAID'
}
