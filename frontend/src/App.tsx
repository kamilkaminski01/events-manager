import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import SharedLayout from 'components/templates/SharedLayout'
import HomePage from 'pages/HomePage'
import RegisterParticipantPage from 'pages/RegisterParticipantPage'
import CreateEventPage from 'pages/CreateEventPage'
import ParticipantPage from 'pages/ParticipantPage'
import EventPage from 'pages/EventPage'
import ProtectedRoutes from 'components/atoms/ProtectedRoutes'
import LoginPage from 'pages/LoginPage'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path={PATHS.login} element={<LoginPage />} />
          <Route path={PATHS.home} element={<HomePage />} />
          <Route path={PATHS.participantDetails} element={<ParticipantPage />} />
          <Route path={PATHS.eventDetails} element={<EventPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path={PATHS.participant} element={<RegisterParticipantPage />} />
            <Route path={PATHS.event} element={<CreateEventPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
