import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowDown } from 'lucide-react'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import {
  capitalize,
  formatPokemonNumber,
  getPokemonArtwork,
  type EvolutionStep,
} from '../lib/pokemon'
import TypeBadge from './TypeBadge'

interface EvolutionListProps {
  steps: EvolutionStep[]
}

function LevelArrow({ minLevel }: { minLevel: number | null }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1 text-[#173EA5]">
      <ArrowDown size={20} aria-hidden="true" />
      <span className="text-xs font-semibold">
        {minLevel !== null ? `Nível ${minLevel}` : 'Evolui'}
      </span>
    </div>
  )
}

function EvolutionRow({ speciesName }: { speciesName: string }) {
  const { data: pokemon, isPending } = usePokemonDetail(speciesName)

  if (isPending || !pokemon) {
    return <div className="h-20 animate-pulse rounded-2xl bg-black/5" />
  }

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const artworkUrl = getPokemonArtwork(pokemon)

  return (
    <Link
      to="/pokemon/$pokemonId"
      params={{ pokemonId: String(pokemon.id) }}
      className="flex items-center gap-4 rounded-2xl border border-border p-2 transition-colors hover:bg-black/5"
    >
      <div
        className="flex size-16 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `var(--color-type-${primaryType})` }}
      >
        {artworkUrl ? (
          <img
            src={artworkUrl}
            alt={capitalize(pokemon.name)}
            loading="lazy"
            className="size-14 object-contain"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold text-text">{capitalize(pokemon.name)}</span>
        <span className="text-xs text-text-muted">
          N°{formatPokemonNumber(pokemon.id)}
        </span>
        <div className="flex gap-1.5">
          {pokemon.types.map((typeSlot) => (
            <TypeBadge key={typeSlot.type.name} typeName={typeSlot.type.name} iconOnly />
          ))}
        </div>
      </div>
    </Link>
  )
}

export default function EvolutionList({ steps }: EvolutionListProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border p-3">
      {steps.map((step, index) => (
        <Fragment key={step.speciesName}>
          {index > 0 ? <LevelArrow minLevel={step.minLevel} /> : null}
          <EvolutionRow speciesName={step.speciesName} />
        </Fragment>
      ))}
    </div>
  )
}