import { createContext, ReactNode, useContext } from 'react'
import { FirebaseApp } from 'firebase/app'

import { firebaseApp, FieldValue } from '../lib/firebase'

export interface FirebaseContextProperties {
  firebaseApp: FirebaseApp
  FieldValue: typeof FieldValue
}

const FirebaseContext = createContext<FirebaseContextProperties>(
  {} as FirebaseContextProperties
)

export interface FirebaseContextProviderProps {
  children: ReactNode
}

export function FirebaseContextProvider({
  children
}: FirebaseContextProviderProps) {
  return (
    <FirebaseContext.Provider value={{ firebaseApp, FieldValue }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default function useFirebaseContext() {
  return useContext(FirebaseContext)
}
