import './style.scss'
import { MealOptionsProps } from './interface'
import { EMealPreference } from 'models/mealPreference.ts'
import Checkbox from 'components/atoms/Checkbox'
import { EMealType } from 'models/mealType.ts'
import { FormProvider, useForm } from 'react-hook-form'
import Modal from 'components/organisms/Modal'
import { useModals } from 'providers/modals/context'

const MealOptions = ({ name, formID }: MealOptionsProps) => {
  const { closeModal } = useModals()
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <Modal title="Choose your meals" buttonText="Confirm" formID={formID} onSubmit={closeModal}>
        <div className="meal-options">
          <div className="meal-options__preference">
            <h3 className="meal-options__preference-title">Meal preference</h3>
            <select
              id="mealPreference"
              data-testid={name}
              className="meal-options__preference-select"
              {...methods.register(name)}>
              <option>-</option>
              <option value={EMealPreference.Carnivorous}>Carnivorous</option>
              <option value={EMealPreference.Vegetarian}>Vegetarian</option>
            </select>
          </div>
          <div className="meal-options__types">
            <Checkbox name={EMealType.Breakfast}>Breakfast</Checkbox>
            <Checkbox name={EMealType.Dinner}>Dinner</Checkbox>
            <Checkbox name={EMealType.Supper}>Supper</Checkbox>
          </div>
        </div>
      </Modal>
    </FormProvider>
  )
}

export default MealOptions
