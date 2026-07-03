import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, Ruler, Shapes, Sparkles, Weight } from 'lucide-react'
import type { ReactNode } from 'react'
import EvolutionList from '../components/EvolutionList'
import FavoriteButton from '../components/FavoriteButton'
import TypeBadge from '../components/TypeBadge'
import { useEvolutionChain } from '../hooks/useEvolutionChain'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import { usePokemonSpecies } from '../hooks/usePokemonSpecies'
import { useWeaknesses } from '../hooks/useWeaknesses'
import {
  capitalize,
  formatHeight,
  formatPercentage,
  formatPokemonNumber,
  formatWeight,
  getEnglishFlavorText,
  getEnglishGenus,
  getEvolutionSteps,
  getGenderRatio,
  getPokemonArtwork,
} from '../lib/pokemon'

function InfoBox({
  label,
  icon,
  value,
}: {
  label: string
  icon: ReactNode
  value: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-text-muted flex items-center gap-1.5 text-xs font-medium">
        {icon}
        {label}
      </span>
      <div className="border-border text-text rounded-xl border px-4 py-2.5 text-center font-semibold">
        {value || '—'}
      </div>
    </div>
  )
}

function GenderBar({ genderRate }: { genderRate: number }) {
  const genderRatio = getGenderRatio(genderRate)

  return (
    <div className="flex flex-col gap-2">
      <span className="text-text-muted text-center text-xs font-medium">
        GÊNERO
      </span>
      {genderRatio ? (
        <>
          <div className="flex h-2.5 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#2551C3]"
              style={{ width: `${genderRatio.malePercentage}%` }}
            />
            <div
              className="h-full flex-1 bg-[#FF7596]"
              style={{ width: `${genderRatio.femalePercentage}%` }}
            />
          </div>
          <div className="text-text flex justify-between text-sm font-medium">
            <span className="text-[#2551C3]">
              ♂ {formatPercentage(genderRatio.malePercentage)}
            </span>
            <span className="text-[#FF7596]">
              ♀ {formatPercentage(genderRatio.femalePercentage)}
            </span>
          </div>
        </>
      ) : (
        <span className="text-text-muted text-center text-sm">Sem gênero</span>
      )}
    </div>
  )
}

export default function PokemonDetailPage() {
  const { pokemonId } = useParams({ from: '/pokemon/$pokemonId' })
  const {
    data: pokemon,
    isPending: isPokemonPending,
    isError,
  } = usePokemonDetail(pokemonId)
  const { data: species } = usePokemonSpecies(pokemonId)
  const { data: evolutionChain } = useEvolutionChain(pokemonId)

  const typeNames = pokemon?.types.map((typeSlot) => typeSlot.type.name) ?? []
  const { weaknesses } = useWeaknesses(typeNames)

  if (isPokemonPending) {
    return (
      <div className="text-text-muted mx-auto flex h-64 max-w-md items-center justify-center">
        Carregando...
      </div>
    )
  }

  if (isError || !pokemon) {
    return (
      <div className="text-text-muted mx-auto max-w-md text-center">
        <p>Não foi possível carregar este Pokémon.</p>
        <Link to="/" className="text-text mt-4 inline-block font-semibold">
          Voltar para a listagem
        </Link>
      </div>
    )
  }

  const primaryType = pokemon.types[0]?.type.name ?? 'normal'
  const artworkUrl = getPokemonArtwork(pokemon)
  const description = species ? getEnglishFlavorText(species) : ''
  const category = species ? getEnglishGenus(species) : ''
  const abilityName = pokemon.abilities[0]?.ability.name ?? ''
  const evolutionSteps = evolutionChain
    ? getEvolutionSteps(evolutionChain.chain)
    : []

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div
        className="relative -mx-4 -mt-6 overflow-hidden rounded-b-full px-10 py-4"
        style={{ backgroundColor: `var(--color-type-${primaryType})` }}
      >
        <img
          src={`/types/${primaryType}.svg`}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-2 size-40 opacity-25 brightness-0 invert"
        />

        <div className="relative z-10 flex items-center justify-between text-white">
          <Link to="/" aria-label="Voltar para a listagem">
            <ArrowLeft size={26} />
          </Link>
          <FavoriteButton pokemonId={pokemon.id} pokemonName={pokemon.name} />
        </div>

        {artworkUrl ? (
          <img
            src={artworkUrl}
            alt={capitalize(pokemon.name)}
            className="relative z-10 mx-auto size-44 object-contain drop-shadow-xl"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-text text-3xl font-bold">
            {capitalize(pokemon.name)}
          </h1>
          <p className="text-text-muted">N°{formatPokemonNumber(pokemon.id)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((typeSlot) => (
            <TypeBadge key={typeSlot.type.name} typeName={typeSlot.type.name} />
          ))}
        </div>
      </div>

      {description ? (
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      ) : null}

      <hr className="border-border" />

      <div className="grid grid-cols-2 gap-4">
        <InfoBox
          label="PESO"
          icon={<Weight size={14} aria-hidden="true" />}
          value={formatWeight(pokemon.weight)}
        />
        <InfoBox
          label="ALTURA"
          icon={<Ruler size={14} aria-hidden="true" />}
          value={formatHeight(pokemon.height)}
        />
        <InfoBox
          label="CATEGORIA"
          icon={<Shapes size={14} aria-hidden="true" />}
          value={category}
        />
        <InfoBox
          label="HABILIDADE"
          icon={<Sparkles size={14} aria-hidden="true" />}
          value={capitalize(abilityName.replace('-', ' '))}
        />
      </div>

      {species ? <GenderBar genderRate={species.gender_rate} /> : null}

      {weaknesses.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-text text-xl font-bold">Fraquezas</h2>
          <div className="grid grid-cols-2 gap-3">
            {weaknesses.map((weaknessType) => (
              <TypeBadge key={weaknessType} typeName={weaknessType} />
            ))}
          </div>
        </div>
      ) : null}

      {evolutionSteps.length > 1 ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-text text-xl font-bold">Evoluções</h2>
          <EvolutionList steps={evolutionSteps} />
        </div>
      ) : null}
    </div>
  )
}