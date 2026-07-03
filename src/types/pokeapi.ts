/**
 * Tipos das respostas cruas da PokeAPI (https://pokeapi.co/docs/v2).
 * Os campos usam snake_case propositalmente: espelham o JSON retornado pela API
 * (response.json() não transforma chaves), não uma abreviação de nomenclatura.
 * Refletem apenas os campos usados pela aplicação, não a resposta completa da API.
 */

export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedApiResource[]
}

export interface PokemonTypeSlot {
  slot: number
  type: NamedApiResource
}

export interface PokemonAbilitySlot {
  ability: NamedApiResource
  is_hidden: boolean
  slot: number
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedApiResource
}

export interface PokemonSprites {
  front_default: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonTypeSlot[]
  abilities: PokemonAbilitySlot[]
  stats: PokemonStat[]
  sprites: PokemonSprites
  species: NamedApiResource
}

export interface PokemonSpecies {
  id: number
  name: string
  generation: NamedApiResource
  evolution_chain: {
    url: string
  }
}

export interface EvolutionDetail {
  min_level: number | null
  trigger: NamedApiResource
  item: NamedApiResource | null
}

export interface EvolutionChainLink {
  species: NamedApiResource
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionChainLink[]
}

export interface EvolutionChain {
  id: number
  chain: EvolutionChainLink
}

export interface TypeResponse {
  pokemon: {
    slot: number
    pokemon: NamedApiResource
  }[]
}

export interface GenerationResponse {
  id: number
  name: string
  pokemon_species: NamedApiResource[]
}
