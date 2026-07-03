import { usePokemonList } from '../hooks/usePokemonList'
import PokemonCard from '../components/PokemonCard'
import PokemonCardSkeleton from '../components/PokemonCardSkeleton'
import SearchBar from '../components/SearchBar'
import ListControls from '../components/ListControls'

const INITIAL_SKELETON_COUNT = 8

function HomePage() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList()

  const pokemonList = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-text">Listagem</h1>

      <div className="flex flex-col gap-3">
        <SearchBar />
        <ListControls />
      </div>

      {isError ? (
        <p className="rounded-2xl bg-black/5 px-4 py-6 text-center text-sm text-text-muted">
          Não foi possível carregar a lista de Pokémon. Tente novamente mais
          tarde.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: INITIAL_SKELETON_COUNT }).map(
              (_unused, index) => <PokemonCardSkeleton key={index} />,
            )
          : pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.name} nameOrId={pokemon.name} />
            ))}
      </div>

      {!isPending && !isError && pokemonList.length === 0 ? (
        <p className="text-center text-sm text-text-muted">
          Nenhum Pokémon encontrado.
        </p>
      ) : null}

      {hasNextPage ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-xl bg-surface-strong px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default HomePage
