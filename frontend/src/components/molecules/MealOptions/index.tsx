import './style.scss'
import { IMealOptionsProps } from './interface'
import { EMealPreference } from 'models/mealPreference.ts'
import Checkbox from 'components/atoms/Checkbox'
import { EMealType } from 'models/mealType.ts'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'

const MealOptions = ({ mealOptionsData, setMealOptionsData }: IMealOptionsProps) => {
  const { closeModal } = useModals()
  const methods = useForm()

  const formID = 'mealOptions'

  const onSubmit = (data: FieldValues) => {
    const mealPreference = data.mealPreference === '-' ? null : data.mealPreference
    const chosenMeals = Object.keys(data)
      .filter((key) => Object.values(EMealType).includes(key as EMealType))
      .filter((key) => data[key])
      .map((key) => key as EMealType)

    setMealOptionsData({ mealPreference, chosenMeals })
    closeModal()
  }

  return (
    <FormProvider {...methods}>
      <Modal
        title="Choose your meals"
        buttonText="Confirm"
        formID={formID}
        onSubmit={methods.handleSubmit(onSubmit)}>
        <form id={formID} className="meal-options">
          <div className="meal-options__preference">
            <h3 className="meal-options__preference-title">Meal preference</h3>
            <select
              id="mealPreference"
              data-testid="mealPreference"
              className="meal-options__preference-select"
              defaultValue={
                mealOptionsData.mealPreference ? mealOptionsData.mealPreference : undefined
              }
              {...methods.register('mealPreference')}>
              <option>-</option>
              <option value={EMealPreference.Carnivorous}>Carnivorous</option>
              <option value={EMealPreference.Vegetarian}>Vegetarian</option>
            </select>
          </div>
          <div className="meal-options__types">
            <Checkbox
              name={EMealType.Breakfast}
              defaultValue={mealOptionsData.chosenMeals.includes(EMealType.Breakfast)}>
              Breakfast
            </Checkbox>
            <Checkbox
              name={EMealType.Dinner}
              defaultValue={mealOptionsData.chosenMeals.includes(EMealType.Dinner)}>
              Dinner
            </Checkbox>
            <Checkbox
              name={EMealType.Supper}
              defaultValue={mealOptionsData.chosenMeals.includes(EMealType.Supper)}>
              Supper
            </Checkbox>
          </div>
        </form>
      </Modal>
    </FormProvider>
  )
}

export default MealOptions
