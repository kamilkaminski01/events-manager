import { IParticipant } from 'models/participant'
import { ICreateParticipant } from 'models/requests/createParticipant'
import { ENDPOINTS } from 'utils/consts'
import useData from './useData'

const useParticipants = () => {
  const {
    data: participants,
    isError,
    getData: getParticipants,
    createData: createParticipant,
    ...rest
  } = useData<IParticipant[], IParticipant[], ICreateParticipant>(ENDPOINTS.participants)

  return { participants, isError, getParticipants, createParticipant, ...rest }
}

export default useParticipants
