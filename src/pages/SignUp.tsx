import { useState, useEffect, SyntheticEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { DASHBOARD, LOGIN } from '../constants/routes'
import { usernameExists } from '../services/firebase'
import { firebaseDb } from '../lib/firebase'

export default function SignUp() {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const isInvalid = password === '' || email === ''

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault()

    if (await usernameExists(username)) {
      setUsername('')
      setError('That username is already taken, please try another.')
      return
    }

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredential.user, {
        displayName: username
      })

      await setDoc(doc(firebaseDb, 'users', userCredential.user.uid), {
        userId: userCredential.user.uid,
        username: username.toLowerCase(),
        fullName,
        email: email.toLowerCase(),
        following: ['2'],
        followers: [],
        dateCreated: Date.now()
      })

      history.push(DASHBOARD)
    } catch (error) {
      setFullName('')
      setEmail('')
      setPassword('')
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    document.title = 'Sign Up - Instagram'
  }, [])

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

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
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
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
