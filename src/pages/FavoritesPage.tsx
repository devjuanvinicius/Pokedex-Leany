import { useFavoritesStore } from '../store/useFavoritesStore'
import SwipeableFavoriteCard from '../components/SwipeableFavoriteCard'

const MAGIKARP_ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png'

function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
      <img
        src={MAGIKARP_ARTWORK_URL}
        alt=""
        aria-hidden="true"
        className="size-48 object-contain opacity-70 grayscale"
      />
      <h2 className="text-xl font-bold text-text">
        Você não favoritou nenhum Pokémon :(
      </h2>
      <p className="max-w-xs text-sm text-text-muted">
        Clique no ícone de coração dos seus pokémons favoritos e eles aparecerão
        aqui.
      </p>
    </div>
  )
}

function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold text-text">Favoritos</h1>

      {favoriteIds.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {favoriteIds.map((favoriteId) => (
            <SwipeableFavoriteCard key={favoriteId} favoriteId={favoriteId} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
