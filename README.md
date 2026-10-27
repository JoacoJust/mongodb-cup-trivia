# ⚽ MongoDB Cup — Trivia de Fútbol Tecnológico (Onboarding)

Juego web interactivo de **onboarding y capacitación técnica** en formato partido
de fútbol: 15 jugadas (desafíos) sobre **MongoDB y Mongoose**. Si acertás, el
balón avanza hacia el arco rival; si fallás, el rival te roba la pelota y
reintentás la jugada. Al resolver las 15 jugadas se marca el
**¡GOOOOL!** con insignia de aptitud.

## Docente objetivo

Evaluar y entrenar a nuevos desarrolladores del equipo en:

- Fundamentos de MongoDB (NoSQL vs SQL, documentos BSON)
- Mongoose Core & ODM (schemas, models, tipos de datos)
- Operaciones CRUD nativas y validaciones
- Relaciones y `.populate()` (referencias, embedding vs referencing)

## ⚙️ Stack

- **React 18** con hooks funcionales (`useState`, `useMemo`, `useCallback`)
- **Vite 5** (HMR rápido, build optimizado)
- **Tailwind CSS 3** (dark mode por defecto, mobile-first)
- Estado local modular (hook `useTriviaGame`), sin librerías extra

## 🗂 Estructura

```text
kahoot-mongodb-mongoose-trivia/
├── index.html                  # shell + dark mode
├── package.json
├── vite.config.js              # configuración Vite + plugin React
├── tailwind.config.js          # tema, animaciones (fade-in, slide-up, scale-in)
├── postcss.config.js
└── src/
    ├── main.jsx                # bootstrap (createRoot)
    ├── App.jsx                 # máquina de estados del partido
    ├── index.css               # tailwind layers
    ├── components/
    │   ├── StartScreen.jsx     # pantall previa con reglas del torneo
    │   ├── ProgressBar.jsx     # cancha + pelota que avanza en tiempo real
    │   ├── GameCard.jsx        # tarjeta de jugada + marcador
    │   ├── OptionButton.jsx    # opciones A/B/C/D con lock anti doble clic
    │   ├── FeedbackModal.jsx   # resultado de jugada + explicación teórica
    │   └── ResultsView.jsx     # pantalla de GOL con insignia y ranking
    ├── data/
    │   └── questions.js        # 15 desafíos con explicaciones
    └── hooks/
        └── useTriviaGame.js    # lógica central del partido (jugadas, robos, avances)
```

## 🕹 Reglas del juego

| Evento | Efecto |
| --- | --- |
| Seleccionás la opción correcta | La gambeta sale bien → jugada registrada, el balón avanza |
| Seleccionás mal | El rival roba la pelota → se muestra explicación y la jugada vuelve a la cola |
| Doble clic en una opción | Bloqueado (una vez respondida la jugada no se puede modificar) |
| Completar las 15 jugadas | 🎉 **¡GOL!** con insignia de aptitud Mongo (golazo si 0 errores) |

El modal de feedback también funciona como "Kahoot tradicional": explicación
instantánea con teoría para profundizar el por qué de la respuesta.

## 🚀 Instalación y ejecución

```bash
# 1. Clonar / abrir la carpeta del proyecto
cd kahoot-mongodb-mongoose-trivia

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev
# → abre http://localhost:5173

# 4. (opcional) build de producción
npm run build
npm run preview
```

## 🧠 Módulos clave

- `useTriviaGame.js` — hook central: registro de jugadas resueltas, contador de
  robos (errores), progreso sobre la cancha, guardias anti-límite de arrays e
  ids repetidos, y avance sólo con respuesta correcta.
- `questions.js` — banco de 15 desafíos con categorías: Fundamentos,
  Mongoose ODM, CRUD/Validaciones, Relaciones y `.populate()`.
- `FeedbackModal.jsx` — refuerzo teórico inmediato tras cada jugada.
- `ResultsView.jsx` — ranking del gol (golazo perfecto / con sudor / agónico).
