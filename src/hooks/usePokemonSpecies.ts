import { useQuery } from '@tanstack/react-query'
import { getPokemonSpecies } from '../api/pokemon'

export function usePokemonSpecies(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['pokemonSpecies', nameOrId],
    queryFn: () => getPokemonSpecies(nameOrId!),
    enabled: nameOrId !== undefined,
  })
}
