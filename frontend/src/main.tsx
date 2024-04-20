import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from 'components/atoms/ScrollToTop'
import ParticipantsProvider from 'providers/participants'
import ModalsProvider from 'providers/modals'
import EventsProvider from 'providers/events'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <ParticipantsProvider>
          <EventsProvider>
            <ModalsProvider>
              <App />
            </ModalsProvider>
          </EventsProvider>
        </ParticipantsProvider>
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>
)
