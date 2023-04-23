import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import LoginPage from './Student/loginPage'

import * as ROUTES from './Router/routes'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.STUDENT_LOGIN_PAGE} element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
