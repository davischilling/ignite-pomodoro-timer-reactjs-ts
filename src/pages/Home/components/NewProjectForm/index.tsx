import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { ProjectContext } from '../../../../contexts/Projects'
import { NewProjectFormStyles } from './styles'
const { Form, MinutesAmountInput, TaskInput } = NewProjectFormStyles

export const NewProjectForm = () => {
  const { activeProject } = useContext(ProjectContext)
  const { register } = useFormContext()

  return (
    <Form>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeProject}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeProject}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </Form>
  )
}
