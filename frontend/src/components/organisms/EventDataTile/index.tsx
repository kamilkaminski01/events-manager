import { EventDataTileProps } from './interface'
import Tile from 'components/atoms/Tile'
import SettingsTileHeader from 'components/atoms/SettingsTileHeader'
import SettingsTileRecord from 'components/atoms/SettingsTileRecord'
import { useModals } from 'providers/modals/context'
import NameModal from 'pages/EventPage/partials/modals/NameModal'
import HostModal from 'pages/EventPage/partials/modals/HostModal'
import { useContext } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { filterEventsParticipantsIds, filterParticipantsIds } from 'utils/filterParticipantsIds'
import ParticipantsModal from 'components/molecules/ParticipantsModal'
import { FieldValues } from 'react-hook-form'
import useEvent from 'hooks/useEvent'
import { generatePath } from 'react-router-dom'
import { PATHS } from 'utils/consts'

const EventDataTile = ({ event, getEvent }: EventDataTileProps) => {
  const { participantsData } = useContext(ParticipantsContext)
  const { openModal, closeModal } = useModals()
  const { updateEvent } = useEvent()

  const onParticipantsSubmit = async (data: FieldValues) => {
    const participants = filterParticipantsIds(data)

    const response = await updateEvent({ participants }, event.id)

    if (response.succeed) {
      closeModal()
      getEvent(event.id)
    }
  }

  return (
    <Tile>
      <SettingsTileHeader title="Event settings" />
      <SettingsTileRecord
        label="Name"
        value={event.name}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(
              <NameModal defaultValue={event.name} eventId={event.id} getEvent={getEvent} />
            )
        }}
      />
      <SettingsTileRecord
        label="Host"
        link={
          event.host
            ? {
                to: generatePath(PATHS.participantDetails, { id: event.host.id }),
                text: `${event.host.firstName} ${event.host.lastName}`
              }
            : undefined
        }
        value={event.host ? `${event.host.firstName} ${event.host.lastName}` : '-'}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(<HostModal eventId={event.id} getEvent={getEvent} defaultHost={event.host} />)
        }}
      />
      <SettingsTileRecord
        label="Participants"
        value={event.participants.length}
        button={{
          text: event.participants.length === 0 ? 'Add participants' : 'Show participants',
          onClick: () =>
            openModal(
              <ParticipantsModal
                participants={participantsData}
                participantsIds={filterEventsParticipantsIds(event.participants)}
                onSubmit={onParticipantsSubmit}
                eventsHostId={event.host?.id}
              />
            )
        }}
      />
    </Tile>
  )
}

export default EventDataTile
