import { useMemo, useState } from 'react'
import { useAllPokemon } from '../hooks/useAllPokemon'
import { useTypePokemonIds } from '../hooks/useTypePokemonIds'
import { useListPreferencesStore } from '../store/useListPreferencesStore'
import PokemonCard from '../components/PokemonCard'
import PokemonCardSkeleton from '../components/PokemonCardSkeleton'
import SearchBar from '../components/SearchBar'
import ListControls from '../components/ListControls'

const PAGE_SIZE = 20

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const selectedType = useListPreferencesStore((state) => state.selectedType)
  const sortOrder = useListPreferencesStore((state) => state.sortOrder)

  const { data: allPokemon, isPending, isError } = useAllPokemon()
  const { data: typePokemonIds, isPending: isTypePending } =
    useTypePokemonIds(selectedType)

  const filterSignature = `${searchQuery}|${selectedType}|${sortOrder}`
  const [previousFilterSignature, setPreviousFilterSignature] =
    useState(filterSignature)
  if (filterSignature !== previousFilterSignature) {
    setPreviousFilterSignature(filterSignature)
    setVisibleCount(PAGE_SIZE)
  }

  const filteredPokemon = useMemo(() => {
    if (!allPokemon) return []
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const result = allPokemon.filter((pokemon) => {
      const matchesQuery = pokemon.name.includes(normalizedQuery)
      const matchesType =
        !selectedType || (typePokemonIds?.has(pokemon.id) ?? false)
      return matchesQuery && matchesType
    })
    result.sort((first, second) =>
      sortOrder === 'number-asc' ? first.id - second.id : second.id - first.id,
    )
    return result
  }, [allPokemon, searchQuery, selectedType, typePokemonIds, sortOrder])

  const visiblePokemon = filteredPokemon.slice(0, visibleCount)
  const isLoading = isPending || (selectedType !== null && isTypePending)
  const hasMore = visibleCount < filteredPokemon.length

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-text">Listagem</h1>

      <div className="flex flex-col gap-3">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <ListControls />
      </div>

      {isError ? (
        <p className="rounded-2xl bg-black/5 px-4 py-6 text-center text-sm text-text-muted">
          Não foi possível carregar a lista de Pokémon. Tente novamente mais
          tarde.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_unused, index) => (
              <PokemonCardSkeleton key={index} />
            ))
          : visiblePokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} nameOrId={String(pokemon.id)} />
            ))}
      </div>

      {!isLoading && !isError && filteredPokemon.length === 0 ? (
        <p className="text-center text-sm text-text-muted">
          Nenhum Pokémon encontrado.
        </p>
      ) : null}

      {hasMore ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-xl bg-surface-strong px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Carregar mais
          </button>
        </div>
      ) : null}
    </div>
  )
}