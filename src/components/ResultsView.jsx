import React from 'react'

/**
 * Pantalla final del partido: fiesta de GOL al resolver las 15 jugadas.
 * Muestra la calidad del pase según cantidad de robos recibidos.
 */
const ResultsView = ({ solvedCount, totalQuestions, errors, onRestart }) => {
  // Grado del gol según eficiencia
  const getRank = () => {
    if (errors === 0) return { label: 'GOLAZO PERFECTO', emoji: '🏆', desc: 'Impecable: ni una sola pelota perdida. Conocés MongoDB y Mongoose de memoria.' }
    if (errors <= 3) return { label: '¡GOL! Jugada de crack', emoji: '⚽', desc: 'Gran manejo del balón. Dominás lo esencial con pocas pérdidas.' }
    if (errors <= 7) return { label: '¡GOL! Con fuerza y sudor', emoji: '💪', desc: 'Llegaste al gol, pero dejaste varias pelotas en el camino. Repasá la documentación.' }
    return { label: '¡GOL! En el último minuto', emoji: '😅', desc: 'Gol agónico: muchas gambetas fallidas. Repasá el material antes de volver a jugar con el equipo.' }
  }

  const rank = getRank()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden">
          {/* Header de fiesta */}
          <div className="p-8 sm:p-12 text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600">
            <div className="text-7xl sm:text-8xl mb-4 animate-scale-in">{rank.emoji}</div>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-3 tracking-tight">
              ¡GOOOOL!
            </h1>
            <p className="text-white/90 text-lg sm:text-xl font-semibold">
              Conquistaste la portería del Desconocimiento
            </p>
          </div>

          {/* Estadísticas del partido */}
          <div className="p-8 sm:p-12 space-y-6">
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                {solvedCount}/{totalQuestions}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                JUGADAS GANADAS
              </div>
              <div className="text-slate-400">
                {errors} pelotas perdidas en el camino
              </div>
            </div>

            {/* Grado del gol */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-emerald-500/30 text-center">
              <div className="text-3xl mb-2">{rank.emoji}</div>
              <div className="text-2xl font-black text-emerald-400 mb-2">{rank.label}</div>
              <p className="text-slate-300 text-sm">{rank.desc}</p>
            </div>

            {/* Insignia técnica */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5 text-center">
              <p className="text-sm text-emerald-300">
                <strong>🏅 Insignia de Aptitud MongoDB & Mongoose desbloqueada</strong>
                <br />
                Ya podés firmar para el equipo de backend NoSQL.
              </p>
            </div>

            {/* Acciones */}
            <div className="space-y-3">
              <button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500
                           text-white font-black text-lg py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/40
                           hover:shadow-emerald-500/60 transform hover:scale-[1.02] active:scale-[0.98]
                           transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>🔄</span>
                <span>JUGAR UN NUEVO PARTIDO</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6
                           rounded-xl border border-slate-600 transition-all duration-200"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsView
