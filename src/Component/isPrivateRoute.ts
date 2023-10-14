import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import CheckAuth from './CheckAuth'

function isPrivateRoute (): void {
  const navigate = useNavigate()
  if (!CheckAuth()) {
    navigate(ROUTES.LANDING_PAGE)
  }
}

export default isPrivateRoute
