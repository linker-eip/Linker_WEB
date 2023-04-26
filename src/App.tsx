import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './i18n'

import StudentLoginPage from './Student/studentLoginPage'
import CompanyLoginPage from './Company/companyLoginPage'

import * as ROUTES from './Router/routes'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<StudentLoginPage/>}/>
        <Route path={ROUTES.COMPANY_LOGIN_PAGE} element={<CompanyLoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
