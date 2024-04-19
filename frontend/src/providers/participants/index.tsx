import React, { PropsWithChildren, useEffect } from 'react'
import { ParticipantsContext } from './context'
import useParticipants from 'hooks/useParticipants'

const ParticipantsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { participantsData, getParticipantsData, isLoading, isError } = useParticipants()

  const updateParticipantsData = () => getParticipantsData()

  useEffect(() => {
    getParticipantsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ParticipantsContext.Provider
      value={{ participantsData, updateParticipantsData, isLoading, isError }}>
      {children}
    </ParticipantsContext.Provider>
  )
}

export default ParticipantsProvider
