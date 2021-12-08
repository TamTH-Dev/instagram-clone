import { createContext, ReactNode, useContext } from 'react'
import { User } from 'firebase/auth'

export interface UserContextProperties {
  user: User | null
}

const UserContext = createContext({} as UserContextProperties)

export interface UserContextProviderProps {
  user: User | null
  children: ReactNode
}

export function UserContextProvider({
  user,
  children
}: UserContextProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export default function useUserContext() {
  return useContext(UserContext)
}
