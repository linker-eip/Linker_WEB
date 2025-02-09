import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import './i18n'

import HomePage from './HomePage'
import StudentLoginPage from './Student/studentLoginPage'
import CompanyLoginPage from './Company/companyLoginPage'
import CompanyRegisterPage from './Company/companyRegisterPage'
import StudentRegisterPage from './Student/studentRegisterPage'
import CompanyDashboard from './Company/companyDashboard'
import StudentDashboard from './Student/Dashbord/studentDashboard'
import CompanyDocuments from './Company/Documents/companyDocuments'
import StudentDocuments from './Student/Dashbord/MesDocuments/studentDocuments'
import CompanyForgetPassword from './Company/companyForgetPassword'
import CompanyResetPassword from './Company/companyResetPassword'
import StudentForgetPassword from './Student/studentForgetPassword'
import StudentResetPassword from './Student/studentResetPassword'
import StudentProfile from './Student/Dashbord/Profile/StudentProfile'
import StudentMissions from './Student/Dashbord/Missions/StudentMissions'
import StudentDetailedMission from './Student/Mission/StudentDetailedMission'
import StudentStatistics from './Student/Statistics/StudentStatistics'
import StudentGroup from './Student/Dashbord/Group/StudentGroup'
import CompanyMissions from './Company/Dashbord/Missions/companyMissions'
import CompanyDetailedMission from './Company/Mission/CompanyDetailedMission'
import CompanyProfile from './Company/Dashbord/Profile/CompanyProfile'
import CompanyMissionChat from './Company/Mission/CompanyMissionChat'
import StudentMissionChat from './Student/Dashbord/Missions/StudentMissionChat'
import StudentPrivateChat from './Student/Dashbord/Réseau/Partials/StudentPrivateChat'
import StudentPayments from './Student/Dashbord/MesPaiements/studentPayments'
import StudentNetwork from './Student/Dashbord/Réseau/studentNetwork'
import StudentSettings from './Student/Dashbord/Settings/StudentSettings'
import CompanySettings from './Company/Dashbord/Settings/CompanySettings'
import StudentMailbox from './Student/Dashbord/Mailbox/studentMailbox'
import CompanyMailbox from './Company/Dashbord/Mailbox/companyMailbox'

import AuthVerifyPwd from './Auth/AuthVerifyPwd'
import StudentInvoices from './Student/Dashbord/MesFactures/studentInvoices'
import CompanyInvoices from './Company/Dashbord/MesFactures/companyInvoices'

import AdminLoginPage from './Admin/adminLoginPage'
import AdminDashboard from './Admin/adminDashboard'
import AdminUsers from './Admin/Users/adminUsers'
import AdminMissions from './Admin/Missions/adminMissions'
import AdminDocuments from './Admin/Documents/adminDocuments'
import AdminVerifyCompany from './Admin/VerifyCompanyDocuments/adminVerifyCompany'
import AdminVerifyStudent from './Admin/VerifyStudentDocuments/adminVerifyStudent'
import AdminContacts from './Admin/Contacts/adminContacts'
import AdminArchives from './Admin/Archives/adminArchives'
import AdminPayments from './Admin/Payments/adminPayments'

import MentionLegales from './Transverse/mentionLegales'
import Footer from './Transverse/Footer'
import Contact from './Transverse/contact'
import WaitVerifiedStudentAccount from './Transverse/waitVerifyAccount'

import * as ROUTES from './Router/routes'
import AdminTickets from './Admin/Tickets/adminTickets'
import { StudentContact } from './Student/Dashbord/Contact/StudentContact'
import { CompanyContact } from './Company/Dashbord/Contact/CompanyContact'
import { SnackbarProvider } from 'notistack'

function App (): JSX.Element {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      autoHideDuration={5000}
    >
    <Router>
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={
          <div>
            <HomePage />
            <Footer />
          </div>
        } />
        <Route path={ROUTES.STUDENT_REGISTER_PAGE} element={<StudentRegisterPage />} />
        <Route path={ROUTES.COMPANY_REGISTER_PAGE} element={<CompanyRegisterPage />} />
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<StudentLoginPage />} />
        <Route path={ROUTES.COMPANY_LOGIN_PAGE} element={<CompanyLoginPage />} />
        <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
        <Route path={ROUTES.STUDENT_MAILBOX} element={<StudentMailbox />} />
        <Route path={ROUTES.COMPANY_DASHBOARD} element={<CompanyDashboard />} />
        <Route path={ROUTES.COMPANY_MAILBOX} element={<CompanyMailbox />} />
        <Route path={ROUTES.STUDENT_DOCUMENTS_DASHBOARD} element={<StudentDocuments />} />
        <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfile />} />
        <Route path={ROUTES.STUDENT_MISSIONS} element={<StudentMissions />} />
        <Route path={ROUTES.STUDENT_NETWORK} element={<StudentNetwork />} />
        <Route path={ROUTES.STUDENT_DETAILED_MISSION} element={<StudentDetailedMission />} />
        <Route path={ROUTES.STUDENT_STATISTICS} element={<StudentStatistics />} />
        <Route path={ROUTES.STUDENT_GROUP} element={<StudentGroup />} />
        <Route path={ROUTES.STUDENT_SETTINGS} element={<StudentSettings />} />
        <Route path={ROUTES.COMPANY_SETTINGS} element={<CompanySettings />} />
        <Route path={ROUTES.STUDENT_MISSION_CHAT} element={<StudentMissionChat/>} />
        <Route path={ROUTES.STUDENT_PRIVATE_MESSAGE} element={<StudentPrivateChat/>} />
        <Route path={ROUTES.STUDENT_PAYMENTS} element={<StudentPayments/>} />
        <Route path={ROUTES.STUDENT_CONTACT} element={<StudentContact/>} />
        <Route path={ROUTES.COMPANY_DOCUMENTS_DASHBOARD} element={<CompanyDocuments />} />
        <Route path={ROUTES.COMPANY_FORGOT_PASSWORD} element={<CompanyForgetPassword />} />
        <Route path={ROUTES.COMPANY_RESET_PASSWORD} element={<CompanyResetPassword />} />
        <Route path={ROUTES.STUDENT_FORGOT_PASSWORD} element={<StudentForgetPassword />} />
        <Route path={ROUTES.STUDENT_RESET_PASSWORD} element={<StudentResetPassword />} />
        <Route path={ROUTES.AUTH_VERIFY_PWD} element={
          <div>
            <AuthVerifyPwd />
            <Footer />
          </div>
        } />
        <Route path={ROUTES.STUDENT_INVOICES_DASHBOARD} element={<StudentInvoices />} />
        <Route path={ROUTES.COMPANY_INVOICES_DASHBOARD} element={<CompanyInvoices />} />
        <Route path={ROUTES.COMPANY_MISSIONS} element={<CompanyMissions />} />
        <Route path={ROUTES.COMPANY_DETAILED_MISSION} element={<CompanyDetailedMission />} />
        <Route path={ROUTES.COMPANY_MISSION_CHAT} element={<CompanyMissionChat/>}/>
        <Route path={ROUTES.COMPANY_PROFILE} element={<CompanyProfile />} />
        <Route path={ROUTES.COMPANY_CONTACT} element={<CompanyContact/>} />
        <Route path={ROUTES.ADMIN_LOGIN_PAGE} element={<AdminLoginPage />} />
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_MISSIONS_DASHBOARD} element={<AdminMissions />} />
        <Route path={ROUTES.ADMIN_DOCUMENTS_DASHBOARD} element={<AdminDocuments />} />
        <Route path={ROUTES.ADMIN_USERS_DASHBOARD} element={<AdminUsers />} />
        <Route path={ROUTES.ADMIN_VERIFY_COMPANY_DOCUMENTS} element={<AdminVerifyCompany />} />
        <Route path={ROUTES.ADMIN_VERIFY_STUDENT_DOCUMENTS} element={<AdminVerifyStudent />} />
        <Route path={ROUTES.ADMIN_CONTACTS} element={<AdminContacts />} />
        <Route path={ROUTES.ADMIN_ARCHIVES} element={<AdminArchives />} />
        <Route path={ROUTES.ADMIN_PAYMENTS} element={<AdminPayments />} />
        <Route path={ROUTES.ADMIN_TICKETS} element={<AdminTickets />} />
        <Route path={ROUTES.MENTION_LEGALES} element={
          <div>
            <MentionLegales />
            <Footer />
          </div>
        } />
        <Route path={ROUTES.CONTACT} element={
          <div>
            <Contact />
            <Footer />
          </div>
        } />
        <Route path={ROUTES.WAIT_VERIFIED_STUDENT_ACCOUNT} element={
          <div>
            <WaitVerifiedStudentAccount />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
    </SnackbarProvider>
  )
}

export default App
