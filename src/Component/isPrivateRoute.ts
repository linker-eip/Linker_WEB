import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../Router/routes'
import CheckAuth, { CheckAdmin } from './CheckAuth'

function isPrivateRoute ({ admin = false }: { admin?: boolean } = {}): void {
  const navigate = useNavigate()

  if (admin) {
    if (!CheckAdmin()) {
      navigate(ROUTES.LANDING_PAGE)
    }
  }
  if (!CheckAuth()) {
    navigate(ROUTES.LANDING_PAGE)
  }
}

export default isPrivateRoute
