import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import useFirebaseContext from '../context/firebase'

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

  const handleLogin = () => {

  }

  return <div>Login page</div>
}
