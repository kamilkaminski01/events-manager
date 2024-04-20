import { IParticipant } from 'models/participant'
import { ICreateParticipant } from 'models/requests/createParticipant'
import { ENDPOINTS } from 'utils/consts'
import useData from './useData'
import { useContext } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { EventsContext } from 'providers/events/context'

const useParticipant = () => {
  const { updateParticipantsData } = useContext(ParticipantsContext)
  const { updateEventsData } = useContext(EventsContext)

  const {
    data: participant,
    isError,
    getData: getParticipant,
    createData: createParticipant,
    updateData: updateParticipant,
    deleteData: deleteParticipant,
    ...rest
  } = useData<IParticipant, IParticipant, ICreateParticipant>(ENDPOINTS.participants, {
    transformGetData: () => {
      updateParticipantsData()
      updateEventsData()
    }
  })

  return {
    participant,
    isError,
    getParticipant,
    createParticipant,
    updateParticipant,
    deleteParticipant,
    ...rest
  }
}

export default useParticipant
