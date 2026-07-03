import { useQuery } from '@tanstack/react-query'
import { getPokemon } from '../api/pokemon'

export function usePokemonDetail(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['pokemonDetail', nameOrId],
    queryFn: () => getPokemon(nameOrId!),
    enabled: nameOrId !== undefined,
  })
}
