import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoritesStore } from './useFavoritesStore'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] })
  })

  it('favorita e desfavorita alternando o mesmo id', () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    toggleFavorite(25)
    expect(useFavoritesStore.getState().favoriteIds).toContain(25)
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(true)

    toggleFavorite(25)
    expect(useFavoritesStore.getState().favoriteIds).not.toContain(25)
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(false)
  })

  it('mantém múltiplos favoritos na ordem de inclusão', () => {
    const { toggleFavorite } = useFavoritesStore.getState()

    toggleFavorite(1)
    toggleFavorite(4)
    toggleFavorite(7)

    expect(useFavoritesStore.getState().favoriteIds).toEqual([1, 4, 7])
  })
})
