import { createContext, ReactNode, useState } from 'react'

interface newProjectData {
  task: string
  minutesAmount: number
}

interface Project {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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
  const [projects, setProjects] = useState<Project[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  const activeProject = projects.find(
    (project) => project.id === activeProjectId,
  )

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCurrentProjectAsFinished = () => {
    setProjects((state) =>
      state.map((project) => {
        if (project.id === activeProjectId) {
          return { ...project, finishedDate: new Date() }
        } else {
          return project
        }
      }),
    )
  }

  const handleAddNewProject = ({ task, minutesAmount }: newProjectData) => {
    const newProject: Project = {
      id: String(new Date().getTime()),
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setProjects((state) => [...state, newProject])
    setActiveProjectId(newProject.id)
    setAmountSecondsPassed(0)
  }

  const handleStopProject = () => {
    setProjects((state) =>
      state.map((project) => {
        if (project.id === activeProjectId) {
          return { ...project, interruptedDate: new Date() }
        } else {
          return project
        }
      }),
    )
    setActiveProjectId(null)
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
