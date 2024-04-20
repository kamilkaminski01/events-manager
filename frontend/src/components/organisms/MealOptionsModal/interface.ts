import { Dispatch, SetStateAction } from 'react'
import { IMealOptions } from 'models/mealOptions'

export interface IMealOptionsModalProps {
  mealOptionsData: IMealOptions
  setMealOptionsData: Dispatch<SetStateAction<IMealOptions>>
}
