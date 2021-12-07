import { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { initializeAuth, signInWithEmailAndPassword } from 'firebase/auth'

import useFirebaseContext from '../context/firebase'
import { DASHBOARD, SIGN_UP } from '../constants/routes'

export default function Login() {
  const history = useHistory()
  const { firebaseApp } = useFirebaseContext()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState<string>('')
  const isValid = password !== '' && email !== ''

  useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault()

    try {
      const auth = initializeAuth(firebaseApp)
      const credentialUser = await signInWithEmailAndPassword(auth, email, password)
      console.log(credentialUser)
      history.push(DASHBOARD)
    } catch (error) {
      setEmail('')
      setPassword('')
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={!isValid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                !isValid && 'opacity-50'
              }`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
