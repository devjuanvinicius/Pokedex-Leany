import { useQuery } from '@tanstack/react-query'
import { getType } from '../api/pokemon'
import { getPokemonIdFromUrl } from '../lib/pokemon'

export function useTypePokemonIds(typeName: string | null) {
  return useQuery<Set<number>>({
    queryKey: ['typePokemonIds', typeName],
    queryFn: async () => {
      const response = await getType(typeName!)
      return new Set(
        response.pokemon.map((entry) => getPokemonIdFromUrl(entry.pokemon.url)),
      )
    },
    enabled: typeName !== null,
    staleTime: Infinity,
  })
}
