import './style.scss'
import Dashboard from 'components/organisms/Dashboard'
import ContentSwitcherButton from 'components/atoms/ContentSwitcherButton'
import { EHomePageContentType } from 'models/homePageContentType'
import { useContext, useEffect, useState } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { EventsContext } from 'providers/events/context'

const HomePage = () => {
  const { participantsData, isError: participantsError } = useContext(ParticipantsContext)
  const { eventsData, isError: eventsError } = useContext(EventsContext)
  const [visibleContent, setVisibleContent] = useState(EHomePageContentType.Participants)

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash === 'events') {
      setVisibleContent(EHomePageContentType.Events)
    } else {
      setVisibleContent(EHomePageContentType.Participants)
    }
  }, [])

  const onParticipantsSwitch = () => {
    setVisibleContent(EHomePageContentType.Participants)
    window.location.hash = 'participants'
  }

  const onEventsSwitch = () => {
    setVisibleContent(EHomePageContentType.Events)
    window.location.hash = 'events'
  }

  return (
    <main className="home-page">
      <div className="home-page__menu">
        <ContentSwitcherButton
          onClick={onParticipantsSwitch}
          isActive={visibleContent === EHomePageContentType.Participants}>
          Participants
        </ContentSwitcherButton>
        <ContentSwitcherButton
          onClick={onEventsSwitch}
          isActive={visibleContent === EHomePageContentType.Events}>
          Events
        </ContentSwitcherButton>
      </div>
      {visibleContent === EHomePageContentType.Participants ? (
        <Dashboard
          contentType="participants"
          content={participantsData}
          isError={participantsError}
        />
      ) : (
        <Dashboard contentType="events" content={eventsData} isError={eventsError} />
      )}
    </main>
  )
}

export default HomePage
