import ParticipantsList from 'components/molecules/ParticipantsList'
import EventsList from 'components/molecules/EventsList'
import './style.scss'
import { DashboardProps } from './interface'
import { IParticipant } from 'models/participant'
import { IEvent } from 'models/event'
import { useContext } from 'react'
import { AuthContext } from 'providers/auth/context'
import classNames from 'classnames'
import Spinner from 'components/atoms/Spinner'

const Dashboard = ({ contentType, content, isError, initialLoad }: DashboardProps) => {
  const { isLogged } = useContext(AuthContext)

  return (
    <>
      {isError ? (
        <div className="dashboard dashboard--no-data">
          <h3 className="dashboard__title">Error during loading {contentType}</h3>
        </div>
      ) : initialLoad ? (
        <Spinner />
      ) : (
        <>
          {content.length ? (
            <div className="dashboard">
              {contentType === 'participants' ? (
                <div
                  className={classNames('dashboard__table', {
                    'participants--with-actions': isLogged,
                    participants: !isLogged
                  })}>
                  <div className="table__header">
                    <strong>First name</strong>
                    <strong>Last name</strong>
                    <strong>Is host</strong>
                    <strong>Meal preference</strong>
                    <strong>Chosen meals</strong>
                    {isLogged && <strong>Actions</strong>}
                  </div>
                  <ParticipantsList participants={content as IParticipant[]} />
                </div>
              ) : (
                <div
                  className={classNames('dashboard__table', {
                    'events--with-actions': isLogged,
                    events: !isLogged
                  })}>
                  <div className="table__header">
                    <strong>Name</strong>
                    <strong>Host</strong>
                    <strong>Participants</strong>
                    {isLogged && <strong>Actions</strong>}
                  </div>
                  <EventsList events={content as IEvent[]} />
                </div>
              )}
            </div>
          ) : (
            <div className="dashboard dashboard--no-data">
              <h3 className="dashboard__title">{contentType}</h3>
              <p className="dashboard__subtitle">There are no {contentType}</p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Dashboard
