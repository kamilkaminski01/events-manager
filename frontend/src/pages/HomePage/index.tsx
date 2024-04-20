import './style.scss'
import Dashboard from 'components/organisms/Dashboard'
import ContentSwitcherButton from 'components/atoms/ContentSwitcherButton'
import { EHomePageContentType } from 'models/homePageContentType'
import { useContext, useState } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { EventsContext } from 'providers/events/context'

const HomePage = () => {
  const { participantsData, isError: participantsError } = useContext(ParticipantsContext)
  const { eventsData, isError: eventsError } = useContext(EventsContext)
  const [visibleContent, setVisibleContent] = useState(EHomePageContentType.Participants)

  return (
    <main className="home-page">
      <div className="home-page__menu">
        <ContentSwitcherButton
          onClick={() => setVisibleContent(EHomePageContentType.Participants)}
          isActive={visibleContent === EHomePageContentType.Participants}>
          Participants
        </ContentSwitcherButton>
        <ContentSwitcherButton
          onClick={() => setVisibleContent(EHomePageContentType.Events)}
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
