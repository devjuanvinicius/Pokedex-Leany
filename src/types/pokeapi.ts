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

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedApiResource
  version: NamedApiResource
}

export interface Genus {
  genus: string
  language: NamedApiResource
}

export interface PokemonSpecies {
  id: number
  name: string
  generation: NamedApiResource
  gender_rate: number
  flavor_text_entries: FlavorTextEntry[]
  genera: Genus[]
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

export interface TypeDamageRelations {
  double_damage_from: NamedApiResource[]
  half_damage_from: NamedApiResource[]
  no_damage_from: NamedApiResource[]
}

export interface TypeResponse {
  damage_relations: TypeDamageRelations
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
