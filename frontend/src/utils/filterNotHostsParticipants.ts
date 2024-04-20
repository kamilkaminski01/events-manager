import { IParticipant } from 'models/participant'

export const filterNotHostsParticipants = (participants: IParticipant[]) => {
  return participants.filter((participant) => !participant.isHost)
}

export const notHostsParticipantsOptions = (participants: IParticipant[]) => {
  const filteredParticipants = filterNotHostsParticipants(participants)

  return filteredParticipants.map((participant) => ({
    value: participant.id,
    text: `${participant.id} - ${participant.firstName} ${participant.lastName}`
  }))
}
