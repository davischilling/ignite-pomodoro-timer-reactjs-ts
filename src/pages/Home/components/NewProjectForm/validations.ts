import * as zod from 'zod'

export const newProjectValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

export type newProjectFormData = zod.infer<typeof newProjectValidationSchema>
