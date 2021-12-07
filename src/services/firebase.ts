import { query, collection, where, getDocs } from 'firebase/firestore'

import { firebaseDb } from '../lib/firebase'

export async function usernameExists(username: string) {
  const q = query(
    collection(firebaseDb, 'users'),
    where('username', '==', username.toLowerCase())
  )

  const querySnapshot = await getDocs(q)

  return querySnapshot.size > 0
}
