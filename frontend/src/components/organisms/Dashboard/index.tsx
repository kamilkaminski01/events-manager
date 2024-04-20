import ParticipantsList from 'components/molecules/ParticipantsList'
import EventsList from 'components/molecules/EventsList'
import './style.scss'
import { DashboardProps } from './interface'
import { IParticipant } from 'models/participant'
import { IEvent } from 'models/event'

const Dashboard = ({ contentType, content, isError }: DashboardProps) => {
  return (
    <>
      {isError ? (
        <div className="dashboard dashboard--no-data">
          <h3 className="dashboard__title">Error during loading {contentType}</h3>
        </div>
      ) : (
        <>
          {content.length ? (
            <div className="dashboard">
              {contentType === 'participants' ? (
                <div className="dashboard__table participants">
                  <div className="table__header">
                    <strong>First name</strong>
                    <strong>Last name</strong>
                    <strong>Is host</strong>
                    <strong>Meal preference</strong>
                    <strong>Chosen meals</strong>
                    <strong>Actions</strong>
                  </div>
                  <ParticipantsList participants={content as IParticipant[]} />
                </div>
              ) : (
                <div className="dashboard__table events">
                  <div className="table__header">
                    <strong>Name</strong>
                    <strong>Host</strong>
                    <strong>Participants</strong>
                    <strong>Actions</strong>
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
