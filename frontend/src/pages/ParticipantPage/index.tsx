import './style.scss'
import useParticipant from 'hooks/useParticipant'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ParticipantDataTile from 'components/organisms/ParticipantDataTile'
import Spinner from 'components/atoms/Spinner'
import DeletionTile from 'components/organisms/DeletionTile'

const ParticipantPage = () => {
  const { participant, getParticipant, isError } = useParticipant()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      getParticipant(id)
    }
  }, [id, getParticipant])

  return (
    <main className="participant-page">
      {participant ? (
        <>
          <ParticipantDataTile participant={participant} getParticipant={getParticipant} />
          <DeletionTile itemType="participant" item={participant} />
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
