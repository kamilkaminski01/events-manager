import { beforeEach, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from 'pages/CreateEventPage'
import ParticipantsProvider from 'providers/participants'
import ModalsProvider from 'providers/modals'
import { HelmetProvider } from 'react-helmet-async'

const createButtonName = /create/i
const addParticipantsButtonName = /add participants/i

const mockCreatedEventData = {
  id: 1,
  name: 'Test Event',
  host: {
    id: 5,
    firstName: 'Maciej',
    lastName: 'Brown',
    isHost: true,
    mealPreference: 'Carnivorous',
    chosenMeals: ['Dinner'],
    events: [
      { id: 1, name: 'Summer BBQ' },
      { id: 2, name: 'Sun Rock Festival' },
      { id: 3, name: 'Dubai Vacation' },
      { id: 4, name: 'Q3 Meetup' }
    ]
  },
  participants: []
}

describe('CreateEventPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HelmetProvider>
          <ParticipantsProvider>
            <ModalsProvider>
              <Routes>
                <Route path="/" element={<CreateEventPage />} />
              </Routes>
            </ModalsProvider>
          </ParticipantsProvider>
        </HelmetProvider>
      </BrowserRouter>
    )
  })

  it('should render core fields', () => {
    const eventNameText = screen.getByText('Event Name')
    expect(eventNameText).toBeVisible()

    const eventNameInput = screen.getByTestId('name')
    expect(eventNameInput).toBeVisible()

    const createButton = screen.getByRole('button', { name: createButtonName })
    expect(createButton).toBeVisible()

    const addParticipantsButton = screen.getByRole('button', { name: addParticipantsButtonName })
    expect(addParticipantsButton).toBeVisible()
  })

  it('should not show name error message when valid name is provided', async () => {
    vi.mock('hooks/useEvent', () => {
      return {
        default: () => ({
          event: null,
          isError: false,
          getEvent: vi.fn(),
          createEvent: vi.fn().mockResolvedValue(mockCreatedEventData),
          updateEvent: vi.fn(),
          deleteEvent: vi.fn()
        })
      }
    })

    const eventNameInput = screen.getByTestId('name')
    await userEvent.type(eventNameInput, 'Test Event')
    expect(eventNameInput).toHaveValue('Test Event')

    const createButton = screen.getByRole('button', { name: createButtonName })
    await userEvent.click(createButton)

    await waitFor(() => {
      const errorMessage = screen.queryByTestId('nameErrorMessage')
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  it('should open participants modal when add participants button is clicked', async () => {
    const addParticipantsButton = screen.getByRole('button', { name: addParticipantsButtonName })
    await userEvent.click(addParticipantsButton)

    await waitFor(() => {
      const modalTitle = screen.getByText('Participants')
      expect(modalTitle).toBeVisible()
    })
  })
})
