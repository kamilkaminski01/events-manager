import './style.scss'
import { MealPreferenceProps } from './interface'
import { EMealPreference } from 'models/mealPreference'
import { useFormContext } from 'react-hook-form'

const MealPreference = ({ chosenMealPreference, transformData = false }: MealPreferenceProps) => {
  const { register } = useFormContext()

  return (
    <div className="meal-preference">
      <h3 className="meal-preference__title">Meal preference</h3>
      <select
        id="mealPreference"
        data-testid="mealPreference"
        className="meal-preference__select"
        defaultValue={
          chosenMealPreference
            ? transformData
              ? chosenMealPreference.toUpperCase()
              : chosenMealPreference
            : undefined
        }
        {...register('mealPreference')}>
        <option>-</option>
        <option value={EMealPreference.Carnivorous}>Carnivorous</option>
        <option value={EMealPreference.Vegetarian}>Vegetarian</option>
      </select>
    </div>
  )
}

export default MealPreference
