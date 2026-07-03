import { useQuery } from '@tanstack/react-query'
import { getEvolutionChainByPokemon } from '../api/pokemon'

export function useEvolutionChain(nameOrId: string | number | undefined) {
  return useQuery({
    queryKey: ['evolutionChain', nameOrId],
    queryFn: () => getEvolutionChainByPokemon(nameOrId!),
    enabled: nameOrId !== undefined,
  })
}
