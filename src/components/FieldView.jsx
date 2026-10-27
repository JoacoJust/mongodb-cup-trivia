import React, { useMemo } from 'react'

/**
 * Cancha visual en vivo del partido (vista cenital HORIZONTAL).
 * Se juega de izquierda (nuestro campo) → derecha (arco rival 🥅).
 *
 * - El jugador 🏃 con la pelota ⚽ avanza hacia la derecha.
 * - Los rivales 🧍 (equipo Desconocimiento) están parados a lo largo de la cancha.
 * - Al acertar una jugada, el jugador gambetea al rival más cercano y avanza
 *   un tramo horizontal (animación CSS con transición de posición).
 * - Cada rival "pasado" queda vencido (gris con cruz ❌).
 */
const FieldView = ({ solvedCount, totalQuestions, errors, isAnswered, isCorrect }) => {
  // Posición horizontal del jugador: 6% (arco propio) → 94% (arco rival). top crece a la derecha.
  const playerLeftPercent = useMemo(() => {
    const steps = totalQuestions + 1
    const pos = solvedCount / steps
    return 6 + pos * 88
  }, [solvedCount, totalQuestions])

  /**
   * Rivales: uno por cada jugada, distribuidos de izquierda a derecha
   * (línea defensiva del equipo Desconocimiento).
   */
  const defenders = useMemo(() => {
    return Array.from({ length: totalQuestions }, (_, i) => {
      const index = i + 1
      const leftPercent = 6 + (index / (totalQuestions + 1)) * 88
      return {
        id: index,
        leftPercent,
        beaten: solvedCount >= index // ya gambeteado
      }
    })
  }, [solvedCount, totalQuestions])

  const isCelebrating = isAnswered && isCorrect
  const isRobbed = isAnswered && !isCorrect

  return (
    <div className="w-full mb-6 animate-slide-up">
      {/* Encabezado del marcador */}
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-emerald-400">TÚ 🏃</span>
          <span className="text-slate-500 text-sm">vs</span>
          <span className="text-sm font-bold text-red-400">DESCONOCIMIENTO 🧍</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-emerald-400 font-bold">⚽ {solvedCount} gambetas</span>
          <span className="text-red-400 font-bold">❌ {errors} robos</span>
        </div>
      </div>

      {/* Cancha horizontal GRANDE */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border-2 border-emerald-700/60 shadow-2xl shadow-emerald-900/50">

        {/* Césped con franjas horizontales */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-emerald-950">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 28px, transparent 28px, transparent 56px)'
            }}
          ></div>
        </div>

        {/* Líneas: arco propio (izq), área, círculo central, área rival (der) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 sm:w-14 h-28 sm:h-36 bg-black/30 rounded-r-sm border-r-2 border-white/30"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 sm:w-24 h-40 sm:h-52 border-y-2 border-r-2 border-white/25 rounded-r-xl"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/25"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 border-2 border-white/25 rounded-full"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 sm:w-24 h-40 sm:h-52 border-y-2 border-l-2 border-white/25 rounded-l-xl"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 sm:h-28 h-32 bg-black/40 rounded-l-sm border-l-2 border-white/30"></div>

        {/* Arco rival (meta derecha) */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl sm:text-4xl z-10">
          🥅
        </div>
        <div className="absolute right-2 top-2 text-[10px] uppercase tracking-widest text-white/70 font-bold">
          ¡GOL!
        </div>

        {/* Rivales sobre la cancha (una línea superior y otra inferior, para no taparse) */}
        {defenders.map((d, i) => (
          <div
            key={d.id}
            className={`absolute -translate-y-1/2 transition-all duration-500 z-20 ${
              i % 2 === 0 ? 'top-[28%]' : 'top-[72%]'
            }`}
            style={{ left: `${d.leftPercent}%` }}
          >
            {d.beaten ? (
              <span className="opacity-30 grayscale text-xl sm:text-2xl select-none">🧍‍♂️❌</span>
            ) : (
              <span className="text-xl sm:text-2xl select-none drop-shadow-lg">🧍‍♂️</span>
            )}
          </div>
        ))}

        {/* Camino del jugador (línea punteada) */}
        <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-white/15"></div>

        {/* Jugador con la pelota (corre por el carril central) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 transition-all duration-[1200ms] ease-in-out"
          style={{ left: `${playerLeftPercent}%` }}
        >
          <div className="flex items-center gap-1">
            <span className={`text-lg sm:text-2xl ${isCelebrating ? 'animate-bounce' : ''}`}>⚽</span>
            <span
              className={`text-3xl sm:text-4xl select-none drop-shadow-lg ${
                isCelebrating ? 'animate-pulse' : ''
              } ${isRobbed ? 'grayscale opacity-60' : ''}`}
            >
              🏃‍♂️
            </span>
          </div>
        </div>

        {/* Aviso de robo cuando falló la jugada */}
        {isRobbed && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs bg-red-500/20 border border-red-500/40 text-red-200 px-3 py-1 rounded-full font-bold animate-fade-in">
            ¡Un rival te robó la pelota! 🛡️
          </div>
        )}

        {/* Cántico de celebración */}
        {isCelebrating && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full font-bold animate-fade-in">
            ¡GAMBIETA! Pasando al rival 🔥
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldView
