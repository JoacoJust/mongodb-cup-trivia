import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
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
  const [celebrating, setCelebrating] = useState(false) // gambeta visible en la cancha
  const timeoutRef = useRef(null)

  // Limpieza del timer si el componente se desmonta (evita fugas de memoria)
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

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
   * - Si acertó: se cierra el modal 1.4s para VER la gambeta animada en la cancha
   *   (el jugador corriendo con la pelota y pasando al rival), luego se avanza.
   * - Si falló: se reintenta la misma jugada (la pelota no avanza).
   */
  const nextPlay = useCallback(() => {
    const wasCorrect = currentQuestion && selectedAnswer === currentQuestion.answer

    if (!wasCorrect) {
      // Robo: el modal se cierra y la misma pregunta vuelve a la cola
      setSelectedAnswer(null)
      setIsAnswered(false)
      return
    }

    // Gambeta ganada: primero mostrar la animación del avance
    setIsAnswered(false)
    setSelectedAnswer(null)
    setCelebrating(true)

    timeoutRef.current = setTimeout(() => {
      setCelebrating(false)

      const newSolved = [...solvedIds, currentQuestion.id]
      setSolvedIds(newSolved)

      if (newSolved.length === totalQuestions) {
        setGameState('finished') // ¡GOL!
      }
    }, 1400)
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
    celebrating,
    progress,
    startGame,
    handleAnswerSelect,
    nextPlay,
    restartGame
  }
}
