import { beforeEach, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateEventPage from 'pages/CreateEventPage'
import ParticipantsProvider from 'providers/participants'

const createButtonName = /create/i

describe('CreateEventPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ParticipantsProvider>
          <Routes>
            <Route path="/" element={<CreateEventPage />} />
          </Routes>
        </ParticipantsProvider>
      </BrowserRouter>
    )
  })

  test('render core fields', () => {
    const eventNameText = screen.getByText('Event Name')
    expect(eventNameText).toBeVisible()

    const eventNameInput = screen.getByTestId('name')
    expect(eventNameInput).toBeVisible()

    const createButton = screen.getByRole('button', { name: createButtonName })
    expect(createButton).toBeVisible()
  })
})
