import React from 'react'

/**
 * Barra superior estilo Cancha: muestra el avance del balón hacia la portería.
 * PracticeBar delatan 2: cada acierto avanza hacia el arco rival.
 */
const ProgressBar = ({ solvedCount, totalQuestions, errors }) => {
  const progress = totalQuestions > 0 ? (solvedCount / totalQuestions) * 100 : 0

  return (
    <div className="w-full mb-6 animate-slide-up">
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-emerald-400">JUGADA</span>
          <span className="text-2xl font-black text-white">{solvedCount + 1}</span>
          <span className="text-slate-400">/ {totalQuestions}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-emerald-400">
            ⚽ {solvedCount} avanzadas
          </span>
          <span className="text-sm font-semibold text-red-400">
            ❌ {errors} robos
          </span>
        </div>
      </div>

      {/* Cancha: origen | avances | arco */}
      <div className="w-full bg-slate-800 rounded-full h-4 border border-slate-700 shadow-inner relative overflow-hidden">
        {/* Marcas de la portería */}
        <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-emerald-500/60 to-transparent"></div>
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        {/* Pelota que corre la cancha */}
        <div
          className="absolute top-1/2 -translate-y-1/2 text-lg transition-all duration-500 ease-out"
          style={{ left: `calc(${progress}% - 10px)` }}
        >
          ⚽
        </div>
      </div>

      <div className="flex justify-between mt-1 px-1 text-xs text-slate-500">
        <span>🏠 Nuestro campo</span>
        <span>🥅 Portería rival — ¡GOL al completar las 15!</span>
      </div>
    </div>
  )
}

export default ProgressBar
