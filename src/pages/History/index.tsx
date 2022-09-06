import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'
import { ProjectContext } from '../../contexts/Projects'
import { HistoryContainer } from './styles'
const { Main, HistoryListDiv, StatusSpan } = HistoryContainer

export const History = () => {
  const { projects } = useContext(ProjectContext)

  return (
    <Main>
      <h1>Meu histórico</h1>

      <HistoryListDiv>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.task}</td>
                <td>{project.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(project.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {project.finishedDate && (
                    <StatusSpan statusColor="green">Concluído</StatusSpan>
                  )}
                  {project.interruptedDate && (
                    <StatusSpan statusColor="red">Interrompido</StatusSpan>
                  )}
                  {!project.finishedDate && !project.interruptedDate && (
                    <StatusSpan statusColor="yellow">Em andamento</StatusSpan>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryListDiv>
    </Main>
  )
}
