import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
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

import * as ROUTES from './Router/routes'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={<LandingPage/>}/>
        <Route path={ROUTES.STUDENT_REGISTER_PAGE} element={<StudentRegisterPage/>}/>
        <Route path={ROUTES.COMPANY_REGISTER_PAGE} element={<CompanyRegisterPage/>}/>
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<StudentLoginPage/>}/>
        <Route path={ROUTES.COMPANY_LOGIN_PAGE} element={<CompanyLoginPage/>}/>
        <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard/>}/>
        <Route path={ROUTES.COMPANY_DASHBOARD} element={<CompanyDashboard/>}/>
        <Route path={ROUTES.STUDENT_DOCUMENTS_DASHBOARD} element={<StudentDocuments/>}/>
        <Route path={ROUTES.COMPANY_DOCUMENTS_DASHBOARD} element={<CompanyDocuments/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
