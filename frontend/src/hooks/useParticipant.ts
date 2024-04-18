import { IServerResponse } from 'models/serverResponse'
import { useCallback, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'
import { generatePath } from 'react-router-dom'
import { IParticipant } from 'models/participant'

const useParticipant = (id?: number) => {
  const [participantData, setParticipantData] = useState({} as IParticipant)

  const getParticipantData = useCallback(async (): Promise<IServerResponse> => {
    try {
      const response = await axiosDefault.get(
        generatePath(ENDPOINTS.participantDetails, { id: `${id}` })
      )

      setParticipantData(response.data)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateParticipant = useCallback(async (data: FormData): Promise<IServerResponse> => {
    try {
      await axiosDefault.patch(generatePath(ENDPOINTS.participantDetails, { id: `${id}` }), data)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteParticipant = useCallback(async (): Promise<IServerResponse> => {
    try {
      await axiosDefault.delete(generatePath(ENDPOINTS.participantDetails, { id: `${id}` }))

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    participantData,
    getParticipantData,
    updateParticipant,
    deleteParticipant
  }
}

export default useParticipant
