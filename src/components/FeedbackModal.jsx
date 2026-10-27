import React from 'react'

/**
 * Feedback automático tras cada jugada:
 * - Jugada ganada: la gambeta salió bien, avanza el balón.
 * - Pelota robada: el rival cortó, hay que reintentar la misma jugada.
 */
const FeedbackModal = ({ question, isCorrect, onNext, playerName }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50 animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl border-2 overflow-hidden shadow-2xl
                      animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header de la jugada */}
        <div className={`p-6 sm:p-8 text-center ${
          isCorrect
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
            : 'bg-gradient-to-r from-red-600 to-orange-600'
        }`}>
          <div className="text-6xl sm:text-7xl mb-3 animate-scale-in">
            {isCorrect ? '⚽' : '🛡️'}
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-white mb-2">
            {isCorrect ? '¡GAMBIETA GANADA!' : '¡TE ROBARON LA PELOTA!'}
          </h3>
          <p className="text-white/90 text-lg font-semibold">
            {isCorrect
              ? 'La jugada fue perfecta, avanzás hacia el arco rival 🚀'
              : 'El rival cortó la jugada. Podés recuperarla repasando un poco 📕'}
          </p>
        </div>

        {/* Explicación táctica */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-xl font-bold text-cyan-400 mb-4">
              <span>📖</span> {isCorrect ? 'Repaso táctico' : 'Cómo recuperar la pelota'}
            </h4>
            <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700">
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                {question.explanation}
              </p>
            </div>
          </div>

          {/* Botón siguiente jugada */}
          <button
            onClick={onNext}
            className={`w-full font-black text-lg sm:text-xl py-4 px-6 rounded-xl
                       shadow-lg transform hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-200 flex items-center justify-center gap-2 text-white ${
              isCorrect
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/40'
                : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-red-500/40'
            }`}
          >
            <span>{isCorrect ? 'CONTINUAR LA JUGADA' : 'REINTENTAR ESTA JUGADA'}</span>
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
