import { useState, useCallback, useMemo } from 'react'
import { questions } from '../data/questions'

/**
 * Estado central del juego estilo partido de fútbol.
 * - 15 jugadas (preguntas).
 * - Si aciertas: el balón avanza una posición hacia la portería (paso siguiente).
 * - Si fallas: el rival te roba la pelota, no avanzás; la jugada se reintenta más adelante.
 * - Solo con TODAS las jugadas resueltas se marca el GOL.
 */
export const useTriviaGame = () => {
  const [gameState, setGameState] = useState('start') // 'start' | 'playing' | 'finished'
  const [solvedIds, setSolvedIds] = useState([])      // ids de preguntas ya convertidas en jugadas buenas
  const [errors, setErrors] = useState(0)             // pérdidas de pelota (respuestas incorrectas)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const totalQuestions = questions.length

  /** Próxima jugada: la primera pregunta aún no resuelta. */
  const currentQuestion = useMemo(
    () => questions.find((q) => !solvedIds.includes(q.id)) ?? null,
    [solvedIds]
  )

  const progress = useMemo(
    () => (solvedIds.length / totalQuestions) * 100,
    [solvedIds, totalQuestions]
  )

  const startGame = useCallback(() => {
    setGameState('playing')
    setSolvedIds([])
    setErrors(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
  }, [])

  /**
   * Selección de una opción.
   * Bloqueo de doble clic: si ya respondió, ignora el evento.
   */
  const handleAnswerSelect = useCallback(
    (answerIndex) => {
      if (isAnswered || !currentQuestion) return

      setSelectedAnswer(answerIndex)
      setIsAnswered(true)

      if (answerIndex !== currentQuestion.answer) {
        setErrors((prev) => prev + 1) // el rival roba la pelota
      }
    },
    [isAnswered, currentQuestion]
  )

  /**
   * Cierre del feedback:
   * - Si acertó, la jugada queda registrada y avanza (o finaliza el partido).
   * - Si falló, la misma pregunta vuelve a intentarse más adelante.
   */
  const nextPlay = useCallback(() => {
    const wasCorrect = currentQuestion && selectedAnswer === currentQuestion.answer

    if (wasCorrect) {
      const newSolved = [...solvedIds, currentQuestion.id]
      setSolvedIds(newSolved)

      if (newSolved.length === totalQuestions) {
        setGameState('finished') // ¡GOL!
      }
    }

    setSelectedAnswer(null)
    setIsAnswered(false)
  }, [currentQuestion, selectedAnswer, solvedIds, totalQuestions])

  const restartGame = useCallback(() => {
    startGame()
  }, [startGame])

  return {
    gameState,
    currentQuestion,
    solvedCount: solvedIds.length,
    totalQuestions,
    errors,
    selectedAnswer,
    isAnswered,
    progress,
    startGame,
    handleAnswerSelect,
    nextPlay,
    restartGame
  }
}
