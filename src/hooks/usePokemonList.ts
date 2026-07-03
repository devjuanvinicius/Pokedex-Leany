import { useInfiniteQuery } from '@tanstack/react-query'
import { getPokemonList } from '../api/pokemon'

export const POKEMON_LIST_PAGE_SIZE = 20

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: ({ pageParam }) =>
      getPokemonList({ limit: POKEMON_LIST_PAGE_SIZE, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined
      return allPages.length * POKEMON_LIST_PAGE_SIZE
    },
  })
}
