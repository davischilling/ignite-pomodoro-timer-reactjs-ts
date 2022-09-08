import { Project } from './reducer'

export enum ActionTypes {
  ADD_NEW_PROJECT = 'ADD_NEW_PROJECT',
  INTERRUPT_CURRENT_PROJECT = 'INTERRUPT_CURRENT_PROJECT',
  MARK_CURRENT_PROJECT_AS_FINISHED = 'MARK_CURRENT_PROJECT_AS_FINISHED',
}

export const addNewProjectAction = (newProject: Project) => {
  return {
    type: ActionTypes.ADD_NEW_PROJECT,
    payload: {
      newProject,
    },
  }
}

export const handleStopProjectAction = () => {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_PROJECT,
  }
}

export const markCurrentProjectAsFinishedAction = () => {
  return {
    type: ActionTypes.MARK_CURRENT_PROJECT_AS_FINISHED,
  }
}
