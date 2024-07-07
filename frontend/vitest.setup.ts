import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

const mockParticipantsData = [
  {
    id: 1,
    firstName: 'Kamil',
    lastName: 'Kaminski',
    isHost: true,
    mealPreference: 'Carnivorous',
    chosenMeals: ['Breakfast', 'Supper'],
    events: [
      { id: 2, name: 'Sun Rock Festival' },
      { id: 4, name: 'Q3 Meetup' }
    ]
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'William',
    isHost: true,
    mealPreference: 'Vegetarian',
    chosenMeals: ['Dinner', 'Supper'],
    events: []
  },
  {
    id: 4,
    firstName: 'Lucas',
    lastName: 'Davis',
    isHost: true,
    mealPreference: 'Carnivorous',
    chosenMeals: ['Breakfast'],
    events: [{ id: 3, name: 'Dubai Vacation' }]
  },
  {
    id: 5,
    firstName: 'Maciej',
    lastName: 'Brown',
    isHost: false,
    mealPreference: 'Carnivorous',
    chosenMeals: ['Dinner'],
    events: [
      { id: 1, name: 'Summer BBQ' },
      { id: 2, name: 'Sun Rock Festival' },
      { id: 3, name: 'Dubai Vacation' },
      { id: 4, name: 'Q3 Meetup' }
    ]
  }
]

beforeEach(() => {
  vi.mock('hooks/useParticipants', () => {
    return {
      default: () => ({
        participantsData: mockParticipantsData,
        getParticipantsData: vi.fn().mockResolvedValue({ succeed: true }),
        isLoading: false,
        isError: false
      })
    }
  })
})

afterEach(() => {
  cleanup()
})
