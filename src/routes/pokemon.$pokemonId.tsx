import { createFileRoute } from '@tanstack/react-router'
import PokemonDetailPage from '../pages/PokemonDetailPage'

export const Route = createFileRoute('/pokemon/$pokemonId')({
  component: PokemonDetailPage,
})
