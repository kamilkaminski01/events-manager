import SettingsTileSubtitle from 'components/atoms/SettingsTileSubtitle'
import Tile from 'components/atoms/Tile'
import SettingsTileRecord from 'components/atoms/SettingsTileRecord'
import SettingsTileHeader from 'components/atoms/SettingsTileHeader'
import { DeletionTileProps } from './interface'
import DeletionModal from 'components/molecules/DeletionModal'
import { useModals } from 'providers/modals/context'
import { ENDPOINTS, PATHS } from 'utils/consts'
import useParticipant from 'hooks/useParticipant'
import useEvent from 'hooks/useEvent'
import { useNavigate } from 'react-router-dom'
import { IParticipant } from 'models/participant'
import { IEvent } from 'models/event'

const DeletionTile = ({ itemType, item }: DeletionTileProps) => {
  const { openModal, closeModal } = useModals()
  const { deleteParticipant } = useParticipant()
  const { deleteEvent } = useEvent()
  const navigate = useNavigate()

  const deleteName =
    itemType === 'participant'
      ? `${(item as IParticipant).firstName} ${(item as IParticipant).lastName}`
      : `${(item as IEvent).name}`

  const onSubmit = async (id: number) => {
    const response =
      itemType === 'participant'
        ? await deleteParticipant(ENDPOINTS.participantDetails, id)
        : await deleteEvent(ENDPOINTS.eventDetails, id)

    if (response.succeed) {
      closeModal()
      navigate(itemType === 'participant' ? PATHS.home : PATHS.homeWithEvents)
    }
  }

  return (
    <Tile>
      <SettingsTileHeader
        title={`Delete ${itemType}`}
        button={{
          text: 'Delete',
          onClick: () =>
            openModal(
              <DeletionModal
                title={itemType}
                deleteName={deleteName}
                onSubmit={() => onSubmit(item.id)}
              />
            )
        }}
      />
      <SettingsTileSubtitle>
        {itemType === 'participant' ? (
          <>
            Deleting a participant means that he will be removed from hosting an event and will be
            removed from all other events participated
          </>
        ) : (
          <>
            Deleting an event means that all of it&apos;s participants will be removed from the
            event and the hosting participant won&apos;t be a host anymore
          </>
        )}
      </SettingsTileSubtitle>
      <SettingsTileRecord label={`${itemType} data`} value={deleteName} />
    </Tile>
  )
}

export default DeletionTile
