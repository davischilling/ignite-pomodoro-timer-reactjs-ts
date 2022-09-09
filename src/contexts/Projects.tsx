import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  ActionTypes,
  addNewProjectAction,
  handleStopProjectAction,
  markCurrentProjectAsFinishedAction,
} from '../reducers/projects/actions'
import { Project, projectsReducer } from '../reducers/projects/reducer'

interface newProjectData {
  task: string
  minutesAmount: number
}

interface ProjectContextType {
  projects: Project[]
  activeProject: Project | undefined
  activeProjectId: string | null
  amountSecondsPassed: number
  markCurrentProjectAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  handleAddNewProject: ({ task, minutesAmount }: newProjectData) => void
  handleStopProject: () => void
}

interface ProjectsContextProviderProps {
  children: ReactNode
}

export const ProjectContext = createContext({} as ProjectContextType)

export const ProjectContextProvider = ({
  children,
}: ProjectsContextProviderProps) => {
  const [projectsState, dispatch] = useReducer(
    projectsReducer,
    {
      projects: [],
      activeProjectId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer-1.0.0:cycles-state',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(projectsState)

    localStorage.setItem('@ignite-timer-1.0.0:cycles-state', stateJSON)
  }, [projectsState])

  const { projects, activeProjectId } = projectsState
  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeProject) {
      return differenceInSeconds(new Date(), new Date(activeProject?.startDate))
    }
    return 0
  })

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const handleAddNewProject = ({ task, minutesAmount }: newProjectData) => {
    const newProject: Project = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewProjectAction(newProject))
    setAmountSecondsPassed(0)
  }

  const handleStopProject = () => {
    dispatch(handleStopProjectAction())
  }

  const markCurrentProjectAsFinished = () => {
    dispatch(markCurrentProjectAsFinishedAction())
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        activeProjectId,
        markCurrentProjectAsFinished,
        setSecondsPassed,
        amountSecondsPassed,
        handleAddNewProject,
        handleStopProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
