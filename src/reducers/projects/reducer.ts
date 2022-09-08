import { ActionTypes } from './actions'

export interface Project {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface ProjectsState {
  projects: Project[]
  activeProjectId: string | null
}

export const projectsReducer = (state: ProjectsState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload.newProject],
        activeProjectId: action.payload.newProject.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === state.activeProjectId) {
            return { ...project, interruptedDate: new Date() }
          } else {
            return project
          }
        }),
        activeProjectId: null,
      }
    case ActionTypes.MARK_CURRENT_PROJECT_AS_FINISHED:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === state.activeProjectId) {
            return { ...project, finishedDate: new Date() }
          } else {
            return project
          }
        }),
        activeProjectId: null,
      }
    default:
      return state
  }
}
