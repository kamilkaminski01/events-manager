import { createContext } from 'react'
import { ParticipantsContextProps } from './interface'

export const ParticipantsContext = createContext<ParticipantsContextProps>(
  {} as ParticipantsContextProps
)
