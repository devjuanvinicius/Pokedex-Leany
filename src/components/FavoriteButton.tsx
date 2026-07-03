import { Heart } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useFavoritesStore } from '../store/useFavoritesStore'

interface FavoriteButtonProps {
  pokemonId: number
  pokemonName: string
}

function FavoriteButton({ pokemonId, pokemonName }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(pokemonId),
  )
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(pokemonId)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? `Remover ${pokemonName} dos favoritos`
          : `Adicionar ${pokemonName} aos favoritos`
      }
      className="flex size-8 items-center justify-center rounded-full border border-white bg-black/70 p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
    >
      <Heart
        size={20}
        className={isFavorite ? 'fill-[#FD525C] text-[#FD525C]' : 'text-white'}
      />
    </button>
  )
}

export default FavoriteButton
