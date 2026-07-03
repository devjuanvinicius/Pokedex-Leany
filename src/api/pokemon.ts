import { fetchFromPokeApi } from './client'
import type {
  EvolutionChain,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  TypeResponse,
} from '../types/pokeapi'

export interface GetPokemonListParams {
  limit: number
  offset: number
}

export function getPokemonList({
  limit,
  offset,
}: GetPokemonListParams): Promise<PokemonListResponse> {
  return fetchFromPokeApi<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  )
}

export function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  return fetchFromPokeApi<Pokemon>(`/pokemon/${nameOrId}`)
}

export function getPokemonSpecies(
  nameOrId: string | number,
): Promise<PokemonSpecies> {
  return fetchFromPokeApi<PokemonSpecies>(`/pokemon-species/${nameOrId}`)
}

export function getType(nameOrId: string | number): Promise<TypeResponse> {
  return fetchFromPokeApi<TypeResponse>(`/type/${nameOrId}`)
}

function getEvolutionChain(
  urlOrId: string | number,
): Promise<EvolutionChain> {
  const pathOrUrl =
    typeof urlOrId === 'number' ? `/evolution-chain/${urlOrId}` : urlOrId
  return fetchFromPokeApi<EvolutionChain>(pathOrUrl)
}

export async function getEvolutionChainByPokemon(
  nameOrId: string | number,
): Promise<EvolutionChain> {
  const pokemon = await getPokemon(nameOrId)
  const species = await getPokemonSpecies(pokemon.species.name)
  return getEvolutionChain(species.evolution_chain.url)
}
