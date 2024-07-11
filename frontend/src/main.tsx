import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from 'components/atoms/ScrollToTop'
import ParticipantsProvider from 'providers/participants'
import ModalsProvider from 'providers/modals'
import EventsProvider from 'providers/events'
import AuthProvider from 'providers/auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <AuthProvider>
          <ParticipantsProvider>
            <EventsProvider>
              <ModalsProvider>
                <App />
              </ModalsProvider>
            </EventsProvider>
          </ParticipantsProvider>
        </AuthProvider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
