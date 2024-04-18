import { Dispatch, SetStateAction } from 'react'
import { IMealOptions } from 'models/mealOptions'

export interface IMealOptionsProps {
  mealOptionsData: IMealOptions
  setMealOptionsData: Dispatch<SetStateAction<IMealOptions>>
}
