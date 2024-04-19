import { IServerResponse } from 'models/serverResponse'
import { useCallback, useContext, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'
import { generatePath } from 'react-router-dom'
import { IParticipant } from 'models/participant'
import { ParticipantsContext } from 'providers/participants/context'

const useParticipants = () => {
  const { updateParticipantsData } = useContext(ParticipantsContext)
  const [participantsData, setParticipantsData] = useState<IParticipant[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getParticipantsData = useCallback(async (): Promise<IServerResponse> => {
    try {
      setIsLoading(true)
      setIsError(false)
      const endpoint = generatePath(ENDPOINTS.participants) + '/'
      const response = await axiosDefault.get(endpoint)

      setParticipantsData(response.data)

      return { succeed: true }
    } catch (error) {
      setIsError(true)

      return parseApiErrors(error)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateParticipantsData])

  return { participantsData, getParticipantsData, isLoading, isError }
}

export default useParticipants
