import { ParticipantDataProps } from './interface'
import Tile from 'components/atoms/Tile'
import SettingsTileHeader from 'components/atoms/SettingsTileHeader'
import SettingsTileRecord from 'components/atoms/SettingsTileRecord'
import { useModals } from 'providers/modals/context'
import FirstNameModal from 'pages/ParticipantPage/partials/modals/FirstNameModal'
import LastNameModal from 'pages/ParticipantPage/partials/modals/LastNameModal'
import MealPreferenceModal from 'pages/ParticipantPage/partials/modals/MealPreferenceModal'
import MealTypesModal from 'pages/ParticipantPage/partials/modals/MealTypesModal'

const ParticipantDataTile = ({ participant, getParticipant }: ParticipantDataProps) => {
  const { openModal } = useModals()

  return (
    <Tile>
      <SettingsTileHeader title="Participant settings" />
      <SettingsTileRecord
        label="First name"
        value={participant.firstName}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(
              <FirstNameModal
                defaultValue={participant.firstName}
                participantId={participant.id}
                getParticipant={getParticipant}
              />
            )
        }}
      />
      <SettingsTileRecord
        label="Last name"
        value={participant.lastName}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(
              <LastNameModal
                defaultValue={participant.lastName}
                participantId={participant.id}
                getParticipant={getParticipant}
              />
            )
        }}
      />
      <SettingsTileRecord
        label="Meal preference"
        value={participant.mealPreference}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(
              <MealPreferenceModal
                chosenMealPreference={participant.mealPreference}
                participantId={participant.id}
                getParticipant={getParticipant}
              />
            )
        }}
      />
      <SettingsTileRecord
        label="Chosen meals"
        value={participant.chosenMeals}
        button={{
          text: 'Update',
          onClick: () =>
            openModal(
              <MealTypesModal
                chosenMeals={participant.chosenMeals}
                participantId={participant.id}
                getParticipant={getParticipant}
              />
            )
        }}
      />
    </Tile>
  )
}

export default ParticipantDataTile
