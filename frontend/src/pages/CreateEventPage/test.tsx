import { beforeEach, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from 'pages/CreateEventPage'
import ParticipantsProvider from 'providers/participants'
import ModalsProvider from 'providers/modals'

const createButtonName = /create/i
const addParticipantsButtonName = /add participants/i

describe('CreateEventPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ParticipantsProvider>
          <ModalsProvider>
            <Routes>
              <Route path="/" element={<CreateEventPage />} />
            </Routes>
          </ModalsProvider>
        </ParticipantsProvider>
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
      const modalTitle = screen.getByText('Select participants')
      expect(modalTitle).toBeVisible()
    })
  })
})
