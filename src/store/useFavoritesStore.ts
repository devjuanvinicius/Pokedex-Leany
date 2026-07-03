import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteIds: number[]
  toggleFavorite: (pokemonId: number) => void
  isFavorite: (pokemonId: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      toggleFavorite: (pokemonId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(pokemonId)
            ? state.favoriteIds.filter((favoriteId) => favoriteId !== pokemonId)
            : [...state.favoriteIds, pokemonId],
        })),
      isFavorite: (pokemonId) => get().favoriteIds.includes(pokemonId),
    }),
    {
      name: 'pokedex-favorites',
    },
  ),
)
