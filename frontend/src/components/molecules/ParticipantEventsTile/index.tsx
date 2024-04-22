import { ParticipantEventsTileProps } from './interface'
import Tile from 'components/atoms/Tile'
import SettingsTileRecord from 'components/atoms/SettingsTileRecord'
import { generatePath } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import SettingsTileHeader from 'components/atoms/SettingsTileHeader'

const ParticipantEventsTile = ({ participant, hosted = false }: ParticipantEventsTileProps) => {
  return (
    <Tile>
      {hosted ? (
        <SettingsTileRecord
          label="Hosted event"
          className="settings-tile-record__label--bold"
          link={
            participant.hostedEvent
              ? {
                  to: generatePath(PATHS.eventDetails, { id: participant.hostedEvent.id }),
                  text: participant.hostedEvent.name
                }
              : undefined
          }
        />
      ) : (
        <>
          <SettingsTileHeader title="Participating events" />
          {participant.events.length ? (
            participant.events.map((event, count) => (
              <SettingsTileRecord
                label={`${count + 1}.`}
                link={{ to: generatePath(PATHS.eventDetails, { id: event.id }), text: event.name }}
                key={event.id}
              />
            ))
          ) : (
            <div>-</div>
          )}
        </>
      )}
    </Tile>
  )
}

export default ParticipantEventsTile
