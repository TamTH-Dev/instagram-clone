import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FirebaseContextProvider } from './context/firebase'
import { DASHBOARD, LOGIN, SIGN_UP } from './constants/routes'
import { UserContextProvider } from './context/user'
import GuardRoute from './components/GuardRoute'
import useAuthListener from './hooks/useAuthListener'

const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { user } = useAuthListener()

  return (
    <FirebaseContextProvider>
      <UserContextProvider user={user}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path={LOGIN} component={Login} />
              <Route path={SIGN_UP} component={SignUp} />
              <GuardRoute path={DASHBOARD} user={user} component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </UserContextProvider>
    </FirebaseContextProvider>
  )
}

export default App
