import React from 'react'
import { useTriviaGame } from './hooks/useTriviaGame'
import StartScreen from './components/StartScreen'
import GameCard from './components/GameCard'
import FeedbackModal from './components/FeedbackModal'
import ResultsView from './components/ResultsView'

/**
 * App raíz: máquina de estados del partido.
 * 'start' → pantalla previa, 'playing' → jugadas, 'finished' → ¡GOL!
 */
function App() {
  const {
    gameState,
    currentQuestion,
    solvedCount,
    totalQuestions,
    errors,
    selectedAnswer,
    isAnswered,
    celebrating,
    startGame,
    handleAnswerSelect,
    nextPlay,
    restartGame
  } = useTriviaGame()

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />
  }

  if (gameState === 'finished') {
    return (
      <ResultsView
        solvedCount={solvedCount}
        totalQuestions={totalQuestions}
        errors={errors}
        onRestart={restartGame}
      />
    )
  }

  return (
    <div className="relative">
      <GameCard
        question={currentQuestion}
        solvedCount={solvedCount}
        totalQuestions={totalQuestions}
        errors={errors}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
        celebrating={celebrating}
        onAnswerSelect={handleAnswerSelect}
      />

      {isAnswered && currentQuestion && (
        <FeedbackModal
          question={currentQuestion}
          isCorrect={selectedAnswer === currentQuestion.answer}
          onNext={nextPlay}
        />
      )}
    </div>
  )
}

export default App
