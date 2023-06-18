import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './i18n'

import StudentLoginPage from './Student/studentLoginPage'
import CompanyLoginPage from './Company/companyLoginPage'
import StudentDashboard from './Student/Dashbord/studentDashboard'
import StudentDocuments from './Student/Dashbord/MesDocuments/studentDocuments'

import * as ROUTES from './Router/routes'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<StudentLoginPage/>}/>
        <Route path={ROUTES.COMPANY_LOGIN_PAGE} element={<CompanyLoginPage/>}/>
        <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard/>}/>
        <Route path={ROUTES.STUDENT_DOCUMENTS_DASHBOARD} element={<StudentDocuments/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
