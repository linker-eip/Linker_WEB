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
        <Route path={ROUTES.COMPANY_DOCUMENTS_DASHBOARD} element={<CompanyDocuments/>}/>
        <Route path={ROUTES.COMPANY_FORGOT_PASSWORD} element={<CompanyForgetPassword/>}/>
        <Route path={ROUTES.COMPANY_RESET_PASSWORD} element={<CompanyResetPassword/>}/>
        <Route path={ROUTES.STUDENT_FORGOT_PASSWORD} element={<StudentForgetPassword/>}/>
        <Route path={ROUTES.STUDENT_RESET_PASSWORD} element={<StudentResetPassword/>}/>
      </Routes>
    </Router>
  )
}

export default App
