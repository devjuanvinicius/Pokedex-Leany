import type { SyntheticEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import {
  capitalize,
  formatPokemonNumber,
  getPokemonArtwork,
} from '../lib/pokemon'
import FavoriteButton from './FavoriteButton'
import PokemonCardSkeleton from './PokemonCardSkeleton'
import TypeBadge from './TypeBadge'

interface PokemonCardProps {
  nameOrId: string
}

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none'
}

export default function PokemonCard({ nameOrId }: PokemonCardProps) {
  const { data: pokemon, isPending, isError } = usePokemonDetail(nameOrId)

  if (isPending) {
    return <PokemonCardSkeleton />
  }

  if (isError || !pokemon) {
    return (
      <div className="text-text-muted flex h-24 items-center justify-center rounded-2xl bg-black/5 px-4 text-sm">
        Não foi possível carregar {capitalize(nameOrId)}.
      </div>
    )
  }

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const artworkUrl = getPokemonArtwork(pokemon)

  return (
    <Link
      to="/pokemon/$pokemonId"
      params={{ pokemonId: String(pokemon.id) }}
      className="block"
    >
      <article
        className="border-border relative isolate flex min-h-24 items-center gap-3 overflow-hidden rounded-2xl border pl-4"
        style={{
          backgroundColor: `color-mix(in srgb, var(--color-type-${primaryType}) 14%, #ffffff)`,
        }}
      >
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-surface-strong text-xs font-semibold">
            N°{formatPokemonNumber(pokemon.id)}
          </span>
          <h2 className="text-text text-lg font-bold">
            {capitalize(pokemon.name)}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {pokemon.types.map((typeSlot) => (
              <TypeBadge key={typeSlot.type.name} typeName={typeSlot.type.name} />
            ))}
          </div>
        </div>

        <div
          className="relative flex w-28 shrink-0 items-center justify-center self-stretch overflow-hidden"
          style={{ backgroundColor: `var(--color-type-${primaryType})` }}
        >
          <img
            src={`/types/${primaryType}.svg`}
            alt=""
            aria-hidden="true"
            onError={hideBrokenImage}
            className="absolute inset-0 m-auto size-22 brightness-0 invert"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 15%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 15%, transparent 100%)',
            }}
          />

          {artworkUrl ? (
            <img
              src={artworkUrl}
              alt={capitalize(pokemon.name)}
              loading="lazy"
              className="relative size-16 object-contain drop-shadow"
            />
          ) : null}
        </div>

        <div className="absolute top-3 right-3 z-20">
          <FavoriteButton pokemonId={pokemon.id} pokemonName={pokemon.name} />
        </div>
      </article>
    </Link>
  )
}
