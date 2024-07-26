import './style.scss'
import useParticipant from 'hooks/useParticipant'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ParticipantDataTile from 'components/organisms/ParticipantDataTile'
import Spinner from 'components/atoms/Spinner'
import DeletionTile from 'components/organisms/DeletionTile'
import ParticipantEventsTile from 'components/molecules/ParticipantEventsTile'
import { AuthContext } from 'providers/auth/context'
import Meta from 'components/atoms/Meta'

const ParticipantPage = () => {
  const { participant, getParticipant, isError } = useParticipant()
  const { id } = useParams()
  const { isLogged } = useContext(AuthContext)

  useEffect(() => {
    if (id) {
      getParticipant(id)
    }
  }, [id, getParticipant])

  return (
    <main className="participant-page">
      <Meta>
        <meta name="robots" content="noindex" />
        {participant ? (
          <title>{`${participant.firstName} ${participant.lastName} | Events Manager`}</title>
        ) : (
          <title>{'Participant not found'}</title>
        )}
      </Meta>
      {participant ? (
        <>
          <ParticipantDataTile participant={participant} getParticipant={getParticipant} />
          <ParticipantEventsTile participant={participant} hosted />
          <ParticipantEventsTile participant={participant} />
          {isLogged && <DeletionTile itemType="participant" item={participant} />}
        </>
      ) : isError ? (
        <div className="participant__no-data">
          <h3 className="participant__no-data-title">Participant</h3>
          <p className="participant__no-data-subtitle">Error loading participant</p>
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  )
}

export default ParticipantPage
