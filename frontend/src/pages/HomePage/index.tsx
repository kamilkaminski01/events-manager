import './style.scss'
import Dashboard from 'components/organisms/Dashboard'
import ContentSwitcherButton from 'components/atoms/ContentSwitcherButton'
import { EHomePageContentType } from 'models/homePageContentType'
import { useContext, useEffect, useState } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { EventsContext } from 'providers/events/context'
import classNames from 'classnames'
import { AuthContext } from 'providers/auth/context'
import Meta from 'components/atoms/Meta'

const HomePage = () => {
  const { isLogged } = useContext(AuthContext)
  const {
    participantsData,
    isError: participantsError,
    isLoading: participantsLoading
  } = useContext(ParticipantsContext)
  const { eventsData, isError: eventsError, isLoading: eventsLoading } = useContext(EventsContext)
  const [initialLoad, setInitialLoad] = useState(true)
  const [visibleContent, setVisibleContent] = useState(EHomePageContentType.Participants)

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash === 'events') {
      setVisibleContent(EHomePageContentType.Events)
    } else {
      setVisibleContent(EHomePageContentType.Participants)
    }
  }, [])

  useEffect(() => {
    if (!participantsLoading && !eventsLoading) {
      setTimeout(() => setInitialLoad(false), 250)
    }
  }, [participantsLoading, eventsLoading])

  const onParticipantsSwitch = () => {
    setVisibleContent(EHomePageContentType.Participants)
    window.location.hash = 'participants'
  }

  const onEventsSwitch = () => {
    setVisibleContent(EHomePageContentType.Events)
    window.location.hash = 'events'
  }

  return (
    <main className={classNames('home-page', { logged: isLogged })}>
      <Meta>
        <title>{'Events Manager'}</title>
      </Meta>
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
          initialLoad={initialLoad}
        />
      ) : (
        <Dashboard
          contentType="events"
          content={eventsData}
          isError={eventsError}
          initialLoad={initialLoad}
        />
      )}
    </main>
  )
}

export default HomePage
