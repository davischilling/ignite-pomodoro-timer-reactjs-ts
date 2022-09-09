import { produce } from 'immer'

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
  const currentProjectIndex = state.projects.findIndex(
    (project) => project.id === state.activeProjectId,
  )
  // if (currentProjectIndex < 0) {
  //   return state
  // }

  switch (action.type) {
    case ActionTypes.ADD_NEW_PROJECT:
      // return {
      //   ...state,
      //   projects: [...state.projects, action.payload.newProject],
      //   activeProjectId: action.payload.newProject.id,
      // }
      return produce(state, (draft) => {
        draft.projects.push(action.payload.newProject)
        draft.activeProjectId = action.payload.newProject.id
      })
    case ActionTypes.INTERRUPT_CURRENT_PROJECT: {
      // return {
      //   ...state,
      //   projects: state.projects.map((project) => {
      //     if (project.id === state.activeProjectId) {
      //       return { ...project, interruptedDate: new Date() }
      //     } else {
      //       return project
      //     }
      //   }),
      //   activeProjectId: null,
      // }
      return produce(state, (draft) => {
        draft.projects[currentProjectIndex].interruptedDate = new Date()
        draft.activeProjectId = null
      })
    }
    case ActionTypes.MARK_CURRENT_PROJECT_AS_FINISHED: {
      // return {
      //   ...state,
      //   projects: state.projects.map((project) => {
      //     if (project.id === state.activeProjectId) {
      //       return { ...project, finishedDate: new Date() }
      //     } else {
      //       return project
      //     }
      //   }),
      //   activeProjectId: null,
      // }
      return produce(state, (draft) => {
        draft.projects[currentProjectIndex].finishedDate = new Date()
        draft.activeProjectId = null
      })
    }
    default:
      return state
  }
}
