import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { ProjectContext } from '../../../../contexts/Projects'
import { CountdowStyles } from './styles'
const { CountdowDiv, SeparatorDiv } = CountdowStyles

export const CountDown = () => {
  const {
    activeProject,
    activeProjectId,
    markCurrentProjectAsFinished,
    setSecondsPassed,
    amountSecondsPassed,
  } = useContext(ProjectContext)

  const totalSeconds = activeProject ? activeProject.minutesAmount * 60 : 0
  const currentSeconds = activeProject ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeProject) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeProject])

  useEffect(() => {
    let interval: number

    if (activeProject) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeProject.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentProjectAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeProject,
    totalSeconds,
    activeProjectId,
    markCurrentProjectAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountdowDiv>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorDiv>:</SeparatorDiv>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdowDiv>
  )
}
