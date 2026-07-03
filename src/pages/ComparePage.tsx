import { useState } from 'react'
import { X } from 'lucide-react'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import {
  capitalize,
  formatPokemonNumber,
  getPokemonArtwork,
  translateStatName,
} from '../lib/pokemon'
import type { Pokemon } from '../types/pokeapi'
import PokemonPicker from '../components/PokemonPicker'
import TypeBadge from '../components/TypeBadge'

const STAT_ORDER = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
]
const MAX_BASE_STAT = 255

function getStatValue(pokemon: Pokemon, statName: string): number {
  return pokemon.stats.find((entry) => entry.stat.name === statName)?.base_stat ?? 0
}

function getPrimaryTypeColor(pokemon: Pokemon): string {
  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  return `var(--color-type-${primaryType})`
}

function SelectedPokemon({
  pokemon,
  onClear,
}: {
  pokemon: Pokemon
  onClear: () => void
}) {
  const artworkUrl = getPokemonArtwork(pokemon)

  return (
    <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-border p-3">
      <button
        type="button"
        onClick={onClear}
        aria-label={`Trocar ${capitalize(pokemon.name)}`}
        className="absolute right-2 top-2 text-text-muted hover:text-text"
      >
        <X size={18} />
      </button>
      {artworkUrl ? (
        <img
          src={artworkUrl}
          alt={capitalize(pokemon.name)}
          className="size-24 object-contain"
        />
      ) : null}
      <div className="text-center">
        <p className="text-xs text-text-muted">
          N°{formatPokemonNumber(pokemon.id)}
        </p>
        <p className="font-bold text-text">{capitalize(pokemon.name)}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        {pokemon.types.map((typeSlot) => (
          <TypeBadge key={typeSlot.type.name} typeName={typeSlot.type.name} iconOnly />
        ))}
      </div>
    </div>
  )
}

function CompareStatRow({
  statName,
  leftValue,
  rightValue,
  leftColor,
  rightColor,
}: {
  statName: string
  leftValue: number
  rightValue: number
  leftColor: string
  rightColor: string
}) {
  const leftWins = leftValue > rightValue
  const rightWins = rightValue > leftValue

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
      <div className="flex items-center gap-2">
        <span
          className={`w-8 text-right ${leftWins ? 'font-bold text-text' : 'text-text-muted'}`}
        >
          {leftValue}
        </span>
        <div className="flex h-2 flex-1 justify-end overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(leftValue / MAX_BASE_STAT) * 100}%`,
              backgroundColor: leftColor,
            }}
          />
        </div>
      </div>

      <span className="w-24 text-center text-xs text-text-muted">
        {translateStatName(statName)}
      </span>

      <div className="flex items-center gap-2">
        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-black/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(rightValue / MAX_BASE_STAT) * 100}%`,
              backgroundColor: rightColor,
            }}
          />
        </div>
        <span
          className={`w-8 ${rightWins ? 'font-bold text-text' : 'text-text-muted'}`}
        >
          {rightValue}
        </span>
      </div>
    </div>
  )
}

function ComparePage() {
  const [leftName, setLeftName] = useState<string | null>(null)
  const [rightName, setRightName] = useState<string | null>(null)

  const { data: leftPokemon } = usePokemonDetail(leftName ?? undefined)
  const { data: rightPokemon } = usePokemonDetail(rightName ?? undefined)

  const bothSelected = leftPokemon && rightPokemon

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <h1 className="text-2xl font-bold text-text">Comparar</h1>

      <div className="grid grid-cols-2 gap-4">
        {leftPokemon ? (
          <SelectedPokemon
            pokemon={leftPokemon}
            onClear={() => setLeftName(null)}
          />
        ) : (
          <PokemonPicker onSelect={setLeftName} />
        )}
        {rightPokemon ? (
          <SelectedPokemon
            pokemon={rightPokemon}
            onClear={() => setRightName(null)}
          />
        ) : (
          <PokemonPicker onSelect={setRightName} />
        )}
      </div>

      {bothSelected ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-text">Estatísticas base</h2>
          <div className="flex flex-col gap-3">
            {STAT_ORDER.map((statName) => (
              <CompareStatRow
                key={statName}
                statName={statName}
                leftValue={getStatValue(leftPokemon, statName)}
                rightValue={getStatValue(rightPokemon, statName)}
                leftColor={getPrimaryTypeColor(leftPokemon)}
                rightColor={getPrimaryTypeColor(rightPokemon)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-text-muted">
          Escolha dois Pokémon para comparar suas estatísticas.
        </p>
      )}
    </div>
  )
}

export default ComparePage
