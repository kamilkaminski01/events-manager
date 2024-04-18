import ParticipantsList from 'components/molecules/ParticipantsList'
import { DashboardProps } from './interface'
import './style.scss'
import Spinner from 'components/atoms/Spinner'

const Dashboard = ({ participants, isError, isLoading }: DashboardProps) => {
  return (
    <>
      {isError ? (
        <div className="dashboard dashboard--no-data">
          <h3 className="dashboard__title">Error during loading participants</h3>
        </div>
      ) : (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {participants?.length ? (
                <div className="dashboard">
                  <div className="dashboard__table">
                    <div className="table__header">
                      <strong>First name</strong>
                      <strong>Last name</strong>
                      <strong>Is host</strong>
                      <strong>Meal preference</strong>
                      <strong>Chosen meals</strong>
                      <strong>Actions</strong>
                    </div>
                    <ParticipantsList participants={participants} />
                  </div>
                </div>
              ) : (
                <div className="dashboard dashboard--no-data">
                  <h3 className="dashboard__title">Participants</h3>
                  <p className="dashboard__subtitle">There are no participants</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Dashboard
