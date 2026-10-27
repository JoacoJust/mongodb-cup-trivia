import React from 'react'

/**
 * Pantalla previa al partido: reglas del juego estilo "MongoDB Cup".
 */
const StartScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in bg-gradient-to-b from-emerald-950/60 via-slate-950 to-slate-950">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">
          {/* Header estadio */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-8 sm:p-12 text-center">
            <div className="text-6xl sm:text-7xl mb-4 animate-scale-in">⚽</div>
            <h1 className="text-3xl sm:text-5xl font-black mb-3 tracking-tight text-white">
              MongoDB Cup
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-100">
              Trivia de Fútbol Tecnológico
            </h2>
            <p className="mt-4 text-emerald-100/90 text-lg">
              Onboarding & Capacitación · Mongoose Edition
            </p>
          </div>

          {/* Reglas del partido */}
          <div className="p-8 sm:p-12 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl mb-2">🙋</div>
                <div className="font-bold text-lg">15 Jugadas</div>
                <div className="text-slate-400 text-sm">Desafíos de MongoDB y Mongoose</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl mb-2">🏃</div>
                <div className="font-bold text-lg">Avanzás si acertás</div>
                <div className="text-slate-400 text-sm">Cada acierto corre la pelota hacia el arco</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="font-bold text-lg">Si fallás, te roban</div>
                <div className="text-slate-400 text-sm">La jugada se reintenta más adelante</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl mb-2">🥅</div>
                <div className="font-bold text-lg">¡GOL final!</div>
                <div className="text-slate-400 text-sm">Resolver las 15 conquista la portería</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <span>📋</span> Temas del torneo
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
                <li>• Fundamentos de MongoDB (NoSQL, BSON)</li>
                <li>• Mongoose: Schemas y Models (ODM)</li>
                <li>• Tipos de datos y validaciones</li>
                <li>• CRUD nativo y findByIdAndUpdate</li>
                <li>• Referencias entre colecciones</li>
                <li>• Poblar datos con <code className="text-emerald-400">.populate()</code></li>
              </ul>
            </div>

            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500
                         text-white font-black text-xl py-5 px-8 rounded-xl shadow-lg shadow-emerald-500/40
                         hover:shadow-emerald-500/60 transform hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 flex items-center justify-center gap-3"
            >
              <span>¡PITEAR EL INICIO!</span>
              <span className="text-2xl">🟨</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-500 text-sm">
          Desarrollado para evaluar y entrenar nuevos desarrolladores del equipo
        </p>
      </div>
    </div>
  )
}

export default StartScreen
