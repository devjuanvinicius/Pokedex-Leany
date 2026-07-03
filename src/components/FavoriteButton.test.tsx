import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoriteButton from './FavoriteButton'
import { useFavoritesStore } from '../store/useFavoritesStore'

describe('FavoriteButton', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] })
  })

  it('alterna o estado de favorito ao clicar', async () => {
    const user = userEvent.setup()
    render(<FavoriteButton pokemonId={1} pokemonName="bulbasaur" />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true)

    await user.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })
})
