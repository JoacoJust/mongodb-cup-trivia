import React from 'react'

const OptionButton = ({ option, index, onSelect, isSelected, isCorrect, isWrong, isAnswered, disabled }) => {
  const getButtonStyles = () => {
    if (!isAnswered) {
      return `kahoot-btn bg-slate-800/80 border-slate-600 hover:border-purple-400 
              hover:bg-slate-700/80 text-white`
    }
    
    if (isCorrect) {
      return `kahoot-btn bg-emerald-500/20 border-emerald-400 text-emerald-300 
              shadow-emerald-500/30 cursor-not-allowed`
    }
    
    if (isWrong) {
      return `kahoot-btn bg-red-500/20 border-red-400 text-red-300 
              shadow-red-500/30 cursor-not-allowed`
    }
    
    return `kahoot-btn bg-slate-800/40 border-slate-700 text-slate-500 cursor-not-allowed`
  }

  const getOptionLetter = () => {
    const letters = ['A', 'B', 'C', 'D']
    return letters[index] || String(index + 1)
  }

  const getIcon = () => {
    if (!isAnswered) return null
    if (isCorrect) return <span className="text-2xl">✓</span>
    if (isWrong) return <span className="text-2xl">✗</span>
    return null
  }

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={getButtonStyles()}
    >
      <div className="flex items-center gap-4">
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg
          ${!isAnswered ? 'bg-gradient-to-br from-purple-600 to-pink-600' : ''}
          ${isCorrect ? 'bg-emerald-500' : ''}
          ${isWrong ? 'bg-red-500' : ''}
          ${isAnswered && !isCorrect && !isWrong ? 'bg-slate-700' : ''}
        `}>
          {isAnswered ? getIcon() : getOptionLetter()}
        </div>
        <span className="flex-1">{option}</span>
      </div>
    </button>
  )
}

export default OptionButton
