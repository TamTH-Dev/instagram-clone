import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useEffect, useState } from 'react'

import useFirebaseContext from '../context/firebase'

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('authUser')
      ? JSON.parse(localStorage.getItem('authUser') as string)
      : null
  )
  const { firebaseApp } = useFirebaseContext()

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const listener = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setUser(authUser)
      } else {
        localStorage.removeItem('authUser')
        setUser(null)
      }
    })

    return () => listener()
  }, [firebaseApp])

  return { user }
}
