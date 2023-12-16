import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import './i18n'

import LandingPage from './LandingPage'
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

import AuthVerifyPwd from './Auth/AuthVerifyPwd'
import StudentInvoices from './Student/Dashbord/MesFactures/studentInvoices'
import CompanyInvoices from './Company/Dashbord/MesFactures/companyInvoices'

import AdminLoginPage from './Admin/adminLoginPage'
import AdminDashboard from './Admin/adminDashboard'
import AdminMissions from './Admin/Missions/adminMissions'
import AdminDocuments from './Admin/Documents/adminDocuments'
import AdminUsers from './Admin/Users/adminUsers'

import * as ROUTES from './Router/routes'

function App (): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={<LandingPage/>}/>
        <Route path={ROUTES.STUDENT_REGISTER_PAGE} element={<StudentRegisterPage/>}/>
        <Route path={ROUTES.COMPANY_REGISTER_PAGE} element={<CompanyRegisterPage/>}/>
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<StudentLoginPage/>}/>
        <Route path={ROUTES.COMPANY_LOGIN_PAGE} element={<CompanyLoginPage/>}/>
        <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
        <Route path={ROUTES.COMPANY_DASHBOARD} element={<CompanyDashboard/>}/>
        <Route path={ROUTES.STUDENT_DOCUMENTS_DASHBOARD} element={<StudentDocuments/>}/>
        <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfile/>}/>
        <Route path={ROUTES.STUDENT_MISSIONS} element={<StudentMissions/>}/>
        <Route path={ROUTES.STUDENT_DETAILED_MISSION} element={<StudentDetailedMission />}/>
        <Route path={ROUTES.STUDENT_STATISTICS} element={<StudentStatistics />}/>
        <Route path={ROUTES.STUDENT_GROUP} element={<StudentGroup />}/>
        <Route path={ROUTES.COMPANY_DOCUMENTS_DASHBOARD} element={<CompanyDocuments/>}/>
        <Route path={ROUTES.COMPANY_FORGOT_PASSWORD} element={<CompanyForgetPassword/>}/>
        <Route path={ROUTES.COMPANY_RESET_PASSWORD} element={<CompanyResetPassword/>}/>
        <Route path={ROUTES.STUDENT_FORGOT_PASSWORD} element={<StudentForgetPassword/>}/>
        <Route path={ROUTES.STUDENT_RESET_PASSWORD} element={<StudentResetPassword/>}/>
        <Route path={ROUTES.AUTH_VERIFY_PWD} element={<AuthVerifyPwd/>} />
        <Route path={ROUTES.STUDENT_INVOICES_DASHBOARD} element={<StudentInvoices/>}/>
        <Route path={ROUTES.COMPANY_INVOICES_DASHBOARD} element={<CompanyInvoices/>}/>
        <Route path={ROUTES.COMPANY_MISSIONS} element={<CompanyMissions/>}/>
        <Route path={ROUTES.COMPANY_DETAILED_MISSION} element={<CompanyDetailedMission/>}/>
        <Route path={ROUTES.COMPANY_PROFILE} element={<CompanyProfile />}/>
        <Route path={ROUTES.ADMIN_LOGIN_PAGE} element={<AdminLoginPage/>}/>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard/>}/>
        <Route path={ROUTES.ADMIN_MISSIONS_DASHBOARD} element={<AdminMissions/>}/>
        <Route path={ROUTES.ADMIN_DOCUMENTS_DASHBOARD} element={<AdminDocuments/>}/>
        <Route path={ROUTES.ADMIN_USERS_DASHBOARD} element={<AdminUsers/>}/>
      </Routes>
    </Router>
  )
}

export default App
