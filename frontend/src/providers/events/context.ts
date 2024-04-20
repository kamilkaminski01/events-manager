import { createContext } from 'react'
import { EventsContextProps } from './interface'

export const EventsContext = createContext<EventsContextProps>({} as EventsContextProps)
