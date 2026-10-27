import React from 'react'
import OptionButton from './OptionButton'
import FieldView from './FieldView'

/**
 * Cancha del partido: cada pregunta es una jugada.
 * Si se resuelve bien, el jugador gambetea al rival (animación); si no, lo roban.
 */
const GameCard = ({
  question,
  solvedCount,
  totalQuestions,
  errors,
  selectedAnswer,
  isAnswered,
  celebrating,
  onAnswerSelect
}) => {
  const getCategoryColor = (category) => {
    const colors = {
      "Fundamentos de MongoDB": "from-blue-600 to-cyan-600",
      "Mongoose Core & ODM": "from-purple-600 to-pink-600",
      "CRUD y Validaciones": "from-orange-600 to-red-600",
      "Relaciones y .populate()": "from-emerald-600 to-teal-600"
    }
    return colors[category] || "from-slate-500 to-slate-600"
  }

  // Guardia: sin jugada pendiente no se renderiza nada (límites de arrays seguros)
  if (!question) return null

  return (
    <div className="min-h-screen p-4 py-6 sm:py-10 bg-gradient-to-b from-emerald-950/40 via-slate-950 to-slate-950">
      <div className="max-w-6xl mx-auto">
        <FieldView
          solvedCount={solvedCount}
          totalQuestions={totalQuestions}
          errors={errors}
          isAnswered={isAnswered}
          isCorrect={selectedAnswer === question.answer}
        />

        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/30
                        shadow-2xl shadow-emerald-500/10 overflow-hidden animate-scale-in">
          {/* Jugada (categoría) */}
          <div className={`bg-gradient-to-r ${getCategoryColor(question.category)} p-4 sm:p-5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚽</span>
                <span className="font-bold text-white text-lg sm:text-xl">
                  Jugada: {question.category}
                </span>
              </div>
              {isAnswered && (
                <span className="text-xs bg-black/30 px-3 py-1 rounded-full text-white font-bold">
                  {selectedAnswer === question.answer ? '¡JUGADA GANADA! 🔥' : 'TE ROBÓ LA PELOTA 😱'}
                </span>
              )}
            </div>
          </div>

          {/* Pregunta (desafío) */}
          <div className="p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-8 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option, index) => {
                const isCorrect = isAnswered && index === question.answer
                const isWrong = isAnswered && selectedAnswer === index && index !== question.answer

                return (
                  <OptionButton
                    key={index}
                    option={option}
                    index={index}
                    onSelect={onAnswerSelect}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    isAnswered={isAnswered}
                    disabled={isAnswered}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
