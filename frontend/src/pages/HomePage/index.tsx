import './style.scss'
import useParticipants from 'hooks/useParticipants'
import Dashboard from 'components/organisms/Dashboard'
import { useEffect } from 'react'

const HomePage = () => {
  const { participants, isError, getParticipants, isLoading } = useParticipants()

  useEffect(() => {
    getParticipants()
  }, [getParticipants])

  return (
    <main className="home-page">
      <Dashboard participants={participants} isError={isError} isLoading={isLoading} />
    </main>
  )
}

export default HomePage
