import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FirebaseContextProvider } from './context/firebase'
import { LOGIN, SIGN_UP } from './constants/routes'

const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))

function App() {
  return (
    <FirebaseContextProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={LOGIN} component={Login} />
            <Route path={SIGN_UP} component={SignUp} />
          </Switch>
        </Suspense>
      </Router>
    </FirebaseContextProvider>
  )
}

export default App
