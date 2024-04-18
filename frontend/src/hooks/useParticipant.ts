import { IServerResponse } from 'models/serverResponse'
import { useCallback, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS, PATHS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'
import { generatePath, useNavigate } from 'react-router-dom'
import { IParticipant } from 'models/participant'
import { IRegister } from 'models/requests/register'

const useParticipant = (id?: number) => {
  const [participantData, setParticipantData] = useState({} as IParticipant)
  const navigate = useNavigate()

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

  const createParticipant = async (data: IRegister): Promise<IServerResponse> => {
    try {
      await axiosDefault.post(ENDPOINTS.participants, {
        firstName: data.firstName,
        lastName: data.lastName,
        mealPreference: data.mealPreference,
        chosenMeals: data.chosenMeals
      })

      navigate(PATHS.home)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
  }

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
    createParticipant,
    updateParticipant,
    deleteParticipant
  }
}

export default useParticipant
