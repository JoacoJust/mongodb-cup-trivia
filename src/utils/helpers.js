export const calculatePercentage = (score, total) => {
  if (total === 0) return 0
  return Math.round((score / total) * 100)
}

export const isPassing = (score, total) => {
  // Umbral mínimo: >= 20 aciertos de 30
  return score >= 20
}

export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
