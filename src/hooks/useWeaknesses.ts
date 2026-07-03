import { useQueries } from '@tanstack/react-query'
import { getType } from '../api/pokemon'
import { computeWeaknesses } from '../lib/pokemon'

/**
 * Busca as relações de dano de cada tipo do Pokémon e deriva a lista de
 * fraquezas (tipos com efetividade final maior que 1x).
 */
export function useWeaknesses(typeNames: string[]) {
  const results = useQueries({
    queries: typeNames.map((typeName) => ({
      queryKey: ['type', typeName],
      queryFn: () => getType(typeName),
      staleTime: Infinity,
    })),
  })

  const isPending = results.some((result) => result.isPending)
  const loadedTypes = results.flatMap((result) =>
    result.data ? [result.data] : [],
  )
  const weaknesses =
    loadedTypes.length === typeNames.length
      ? computeWeaknesses(loadedTypes)
      : []

  return { weaknesses, isPending }
}
