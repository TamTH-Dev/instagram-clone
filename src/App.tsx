import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { FirebaseContextProvider } from './context/firebase'
import { LOGIN } from './constants/routes'

const Login = lazy(() => import('./pages/Login'))

function App() {
  return (
    <FirebaseContextProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={LOGIN} component={Login} />
          </Switch>
        </Suspense>
      </Router>
    </FirebaseContextProvider>
  )
}

export default App
