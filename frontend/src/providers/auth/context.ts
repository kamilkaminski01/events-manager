import { createContext } from 'react'
import { AuthContextProps } from './interface'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
