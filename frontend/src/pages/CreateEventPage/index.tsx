import './style.scss'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import Button from 'components/atoms/Button'

const CreateEventPage = () => {
  const methods = useForm()

  const formID = 'createEventForm'

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <main className="create-event-page">
      <FormProvider {...methods}>
        <form className="create-event-form" id={formID} onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className="create-event-form__title">Create an event</h1>
          <Input
            name="name"
            placeholder="Event Name"
            validators={{ required: valid.required, ...validSchemas.name }}
          />
          <Button type="submit" form={formID}>
            Create
          </Button>
        </form>
      </FormProvider>
    </main>
  )
}

export default CreateEventPage
