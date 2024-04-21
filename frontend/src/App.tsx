import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import SharedLayout from 'components/templates/SharedLayout'
import HomePage from 'pages/HomePage'
import RegisterParticipantPage from 'pages/RegisterParticipantPage'
import CreateEventPage from 'pages/CreateEventPage'
import ParticipantPage from 'pages/ParticipantPage'
import EventPage from 'pages/EventPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.participant} element={<RegisterParticipantPage />} />
          <Route path={PATHS.participantDetails} element={<ParticipantPage />} />
          <Route path={PATHS.event} element={<CreateEventPage />} />
          <Route path={PATHS.eventDetails} element={<EventPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
