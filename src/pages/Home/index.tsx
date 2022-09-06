import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { HomeStyles } from './styles'
import {
  NewProjectForm,
  CountDown,
  newProjectFormData,
  newProjectValidationSchema,
} from './components'
import { useContext } from 'react'
import { ProjectContext } from '../../contexts/Projects'
const { Main, StopCountdownButton, StartCountdownButton } = HomeStyles

export const Home = () => {
  const { handleAddNewProject, activeProject, handleStopProject } =
    useContext(ProjectContext)

  const newProjectForm = useForm<newProjectFormData>({
    resolver: zodResolver(newProjectValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })
  const { handleSubmit, watch, reset } = newProjectForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleOnSubmitForm = (data: newProjectFormData) => {
    handleAddNewProject(data)
    reset()
  }

  return (
    <Main>
      <form onSubmit={handleSubmit(handleOnSubmitForm)} action="">
        <FormProvider {...newProjectForm}>
          <NewProjectForm />
        </FormProvider>
        <CountDown />

        {activeProject ? (
          <StopCountdownButton type="button" onClick={handleStopProject}>
            <HandPalm size={24} />
            Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </Main>
  )
}
