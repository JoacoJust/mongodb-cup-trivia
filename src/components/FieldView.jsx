import React, { useMemo } from 'react'

/**
 * Cancha visual en vivo del partido (vista cenital, se juega de abajo hacia arriba).
 *
 * - El jugador 🏃 (con la pelota ⚽) arranca en su campo y avanza hacia el arco 🥅.
 * - Los rivales 🧍 (equipo Desconocimiento) están parados a lo largo de la cancha.
 * - Al acertar una jugada, el jugador gambetea al rival más cercano y avanza
 *   un tramo hacia arriba (animación CSS con transición de posición).
 * - Cada rival "pasado" queda vencido (se desvanece y marca una cruz ❌).
 */
const FieldView = ({ solvedCount, totalQuestions, errors, isAnswered, isCorrect }) => {
  // Procentaje recorrido por el jugador (0% = pelota quieta en el círculo central, 100% = en el arco)
  const playerTopPercent = useMemo(() => {
    const steps = totalQuestions + 1 // empezamos "antes" de la primera línea rival
    const pos = solvedCount / steps
    // desde 9% (arriba) hasta 85% (abajo) → invertido porque top crece hacia abajo
    return 85 - pos * 76 // 85% abajo → 9% arriba en el arco
  }, [solvedCount, totalQuestions])

  /**
   * Rivales: uno por cada jugada (línea defensiva del equipo Desconocimiento).
   * Están distribuidos de abajo hacia arriba; el jugador los pasa uno a uno.
   */
  const defenders = useMemo(() => {
    return Array.from({ length: totalQuestions }, (_, i) => {
      const index = i + 1 // rival #1..#15
      const topPercent = 85 - (index / (totalQuestions + 1)) * 76
      return {
        id: index,
        topPercent,
        beaten: solvedCount >= index // ya gambeteado
      }
    })
  }, [solvedCount, totalQuestions])

  // Estado visual del rival activo (el que está por jugarse)
  const isCelebrating = isAnswered && isCorrect
  const isRobbed = isAnswered && !isCorrect

  return (
    <div className="w-full mb-4 animate-slide-up">
      {/* Encabezado del marcador */}
      <div className="flex justify-between items-center mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-emerald-400">TÚ 🏃</span>
          <span className="text-slate-500 text-sm">vs</span>
          <span className="text-sm font-bold text-red-400">ELS DESCONOCIMIENTO 🧍</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-emerald-400 font-bold">⚽ {solvedCount} gambetas</span>
          <span className="text-red-400 font-bold">❌ {errors} robos</span>
        </div>
      </div>

      {/* Cancha propiamente dicha */}
      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border-2 border-emerald-700/60 shadow-2xl shadow-emerald-900/50">

        {/* Césped con franjas */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-800 to-emerald-950">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 28px, transparent 28px, transparent 56px)'
            }}
          ></div>
        </div>

        {/* Arco rival (meta arriba) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl z-10">
          🥅
        </div>
        <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/70 font-bold">
          ¡GOL al llegar!
        </div>

        {/* Líneas de la cancha: área, círculo central */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-16 border-2 border-white/25 border-t-0 rounded-b-xl"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/25"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-24 h-16 sm:h-24 border-2 border-white/25 rounded-full"></div>
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-40 sm:w-64 h-16 border-2 border-white/25 border-b-0 rounded-t-xl"></div>

        {/* Rivales sobre la cancha */}
        {defenders.map((d) => (
          <div
            key={d.id}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20"
            style={{ top: `${d.topPercent}%` }}
          >
            {d.beaten ? (
              <span className="opacity-30 grayscale text-xl sm:text-2xl select-none">🧍‍♂️❌</span>
            ) : (
              <span className="text-xl sm:text-2xl select-none drop-shadow-lg">🧍‍♂️</span>
            )}
          </div>
        ))}

        {/* Jugador con la pelota (nuestro héroe) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-[900ms] ease-in-out"
          style={{ top: `${playerTopPercent}%` }}
        >
          <div className="flex items-center gap-1">
            {/* Pelota pegada al pie */}
            <span className={`text-lg sm:text-xl ${isCelebrating ? 'animate-bounce' : ''}`}>⚽</span>
            {/* Silueta corriendo */}
            <span
              className={`text-2xl sm:text-3xl select-none drop-shadow-lg ${
                isCelebrating ? 'animate-pulse' : ''
              } ${isRobbed ? 'grayscale opacity-60' : ''}`}
            >
              🏃‍♂️
            </span>
          </div>
        </div>

        {/* Aviso de robo bajo el jugador cuando falló la jugada */}
        {isRobbed && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs bg-red-500/20 border border-red-500/40 text-red-200 px-3 py-1 rounded-full font-bold animate-fade-in">
            ¡Un rival te robó la pelota! 🛡️
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldView
