import './style.scss'
import { IMealOptionsProps } from './interface'
import { filterChosenMeals } from 'utils/filterChosenMeals'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'
import MealTypes from 'components/molecules/MealTypes'
import MealPreference from 'components/molecules/MealPreference'

const MealOptions = ({ mealOptionsData, setMealOptionsData }: IMealOptionsProps) => {
  const { closeModal } = useModals()
  const methods = useForm()

  const formID = 'mealOptions'

  const onSubmit = (data: FieldValues) => {
    const mealPreference = data.mealPreference === '-' ? null : data.mealPreference
    const chosenMeals = filterChosenMeals(data)
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
          <MealPreference chosenMealPreference={mealOptionsData.mealPreference} />
          <MealTypes chosenMeals={mealOptionsData.chosenMeals} />
        </form>
      </Modal>
    </FormProvider>
  )
}

export default MealOptions
