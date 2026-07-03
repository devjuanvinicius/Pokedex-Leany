import { translateStatName } from '../lib/pokemon'

/**
 * Maior valor base possível de uma estatística na PokeAPI, usado para
 * normalizar a largura da barra.
 */
const MAX_BASE_STAT = 255

interface StatBarProps {
  statName: string
  baseStat: number
  accentColor: string
}

/**
 * Linha de uma estatística base: nome (em português), valor e barra
 * proporcional preenchida com a cor de destaque (cor do tipo do Pokémon).
 */
function StatBar({ statName, baseStat, accentColor }: StatBarProps) {
  const fillPercentage = Math.min((baseStat / MAX_BASE_STAT) * 100, 100)

  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-sm text-text-muted">
        {translateStatName(statName)}
      </span>
      <span className="w-8 shrink-0 text-right text-sm font-semibold text-text">
        {baseStat}
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${fillPercentage}%`, backgroundColor: accentColor }}
        />
      </div>
    </div>
  )
}

export default StatBar
