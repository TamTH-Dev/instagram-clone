import { User } from 'firebase/auth'
import { Route, Redirect, useLocation } from 'react-router-dom'

import { LOGIN } from '../constants/routes'

export interface GuardRouteProps {
  user: User | null
  [key: string]: any
}

export default function GuardRoute({ user, ...props }: GuardRouteProps) {
  const location = useLocation()

  if (!user)
    return (
      <Redirect
        to={{
          pathname: LOGIN,
          state: { from: location.pathname }
        }}
      />
    )

  return <Route {...props} />
}
