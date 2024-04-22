import { EMealPreference } from 'models/mealPreference'
import { EMealType } from 'models/mealType'
import { IEvent } from 'models/event'

export interface IParticipant {
  id: number
  firstName: string
  lastName: string
  isHost: boolean
  mealPreference: EMealPreference
  chosenMeals: EMealType[]
  hostedEvent: IEvent | null
  events: IEvent[]
}
