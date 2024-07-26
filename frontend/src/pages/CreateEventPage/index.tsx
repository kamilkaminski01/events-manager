import './style.scss'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import Input from 'components/molecules/Input'
import { valid } from 'utils/Validators/validators'
import { validSchemas } from 'utils/Validators/validatorsSchemas'
import Button from 'components/atoms/Button'
import Select from 'components/atoms/Select'
import { notHostsParticipantsOptions } from 'utils/filterNotHostsParticipants'
import { useContext, useState } from 'react'
import { ParticipantsContext } from 'providers/participants/context'
import { raiseFieldsErrors } from 'utils/raiseFieldsErrors'
import { PATHS } from 'utils/consts'
import useEvent from 'hooks/useEvent'
import { useNavigate } from 'react-router-dom'
import ParticipantsModal from 'components/molecules/ParticipantsModal'
import { ModalsContext } from 'providers/modals/context'
import Meta from 'components/atoms/Meta'

const CreateEventPage = () => {
  const { participantsData } = useContext(ParticipantsContext)
  const { openModal } = useContext(ModalsContext)
  const { createEvent } = useEvent()
  const [participantsIds, setParticipantsIds] = useState<number[]>([])
  const navigate = useNavigate()
  const methods = useForm()

  const formID = 'createEventForm'

  const participantsOptions = notHostsParticipantsOptions(participantsData)

  const onSubmit = async (data: FieldValues) => {
    const { name, hostId } = data

    const response = await createEvent({ name, hostId, participants: participantsIds })

    if (!response.succeed && response.errors) {
      raiseFieldsErrors(response.errors, methods.setError)
    } else {
      navigate(PATHS.homeWithEvents)
    }
  }

  return (
    <main className="create-event-page">
      <Meta>
        <title>{'Events Manager'}</title>
      </Meta>
      <FormProvider {...methods}>
        <form className="create-event-form" id={formID} onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className="create-event-form__title">Create an event</h1>
          <Input
            name="name"
            placeholder="Event Name"
            validators={{ required: valid.required, ...validSchemas.eventName }}
          />
          <div className="create-event-form__host">
            <h3 className="create-event-form__host-title">Pick a host</h3>
            <Select name="hostId" options={participantsOptions} />
          </div>
          <Button
            className="btn--outline"
            type="button"
            onClick={() =>
              openModal(
                <ParticipantsModal
                  participants={participantsData}
                  participantsIds={participantsIds}
                  setParticipantsIds={setParticipantsIds}
                />
              )
            }>
            Add participants
          </Button>
          <Button type="submit" form={formID} disable={participantsOptions.length === 0}>
            Create
          </Button>
        </form>
      </FormProvider>
    </main>
  )
}

export default CreateEventPage
