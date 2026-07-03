import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '../api/pokemon'
import { getPokemonIdFromUrl } from '../lib/pokemon'

export interface PokemonListItem {
  id: number
  name: string
}

export function useAllPokemon() {
  return useQuery<PokemonListItem[]>({
    queryKey: ['allPokemon'],
    queryFn: async () => {
      const response = await getPokemonList({ limit: 100000, offset: 0 })
      return response.results.map((resource) => ({
        id: getPokemonIdFromUrl(resource.url),
        name: resource.name,
      }))
    },
    staleTime: Infinity,
  })
}
