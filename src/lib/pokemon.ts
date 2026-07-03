import type {
  EvolutionChainLink,
  Pokemon,
  PokemonSpecies,
  TypeResponse,
} from '../types/pokeapi'

export function formatPokemonNumber(pokemonId: number): string {
  return pokemonId.toString().padStart(3, '0')
}

export function getPokemonIdFromUrl(resourceUrl: string): number {
  const match = resourceUrl.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

export function getPokemonArtwork(pokemon: Pokemon): string {
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default
  return officialArtwork ?? pokemon.sprites.front_default ?? ''
}

export function capitalize(text: string): string {
  if (text.length === 0) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const typeNamesInPortuguese: Record<string, string> = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Grama',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Venenoso',
  ground: 'Terrestre',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Noturno',
  steel: 'Metal',
  fairy: 'Fada',
}

export function translateTypeName(typeName: string): string {
  return typeNamesInPortuguese[typeName] ?? capitalize(typeName)
}

export const ALL_TYPE_NAMES = Object.keys(typeNamesInPortuguese)

const whiteTextTypes = new Set([
  'water',
  'fighting',
  'poison',
  'ghost',
  'dragon',
  'dark',
  'steel',
])

export function getTypeTextColor(typeName: string): '#ffffff' | '#000000' {
  return whiteTextTypes.has(typeName) ? '#ffffff' : '#000000'
}

const statNamesInPortuguese: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  'special-attack': 'Ataque Esp.',
  'special-defense': 'Defesa Esp.',
  speed: 'Velocidade',
}

export function translateStatName(statName: string): string {
  return statNamesInPortuguese[statName] ?? capitalize(statName)
}

export function formatHeight(heightInDecimeters: number): string {
  return `${(heightInDecimeters / 10).toFixed(1).replace('.', ',')} m`
}

export function formatWeight(weightInHectograms: number): string {
  return `${(weightInHectograms / 10).toFixed(1).replace('.', ',')} kg`
}

export interface EvolutionStep {
  speciesName: string
  minLevel: number | null
}

export function getEvolutionSteps(rootLink: EvolutionChainLink): EvolutionStep[] {
  const steps: EvolutionStep[] = []

  function walk(link: EvolutionChainLink, minLevel: number | null) {
    steps.push({ speciesName: link.species.name, minLevel })
    for (const nextLink of link.evolves_to) {
      walk(nextLink, nextLink.evolution_details[0]?.min_level ?? null)
    }
  }

  walk(rootLink, null)
  return steps
}

export function getEnglishFlavorText(species: PokemonSpecies): string {
  const englishEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  )
  return englishEntry ? englishEntry.flavor_text.replace(/\s+/g, ' ').trim() : ''
}

export function getEnglishGenus(species: PokemonSpecies): string {
  const englishGenus = species.genera.find(
    (genus) => genus.language.name === 'en',
  )
  return englishGenus ? englishGenus.genus.replace(/\s*Pokémon$/i, '') : ''
}

export interface GenderRatio {
  malePercentage: number
  femalePercentage: number
}

export function getGenderRatio(genderRate: number): GenderRatio | null {
  if (genderRate < 0) return null
  const femalePercentage = (genderRate / 8) * 100
  return { malePercentage: 100 - femalePercentage, femalePercentage }
}

export function formatPercentage(value: number): string {
  return `${value.toString().replace('.', ',')}%`
}

export function computeWeaknesses(defenseTypes: TypeResponse[]): string[] {
  const multiplierByAttackingType: Record<string, number> = {}

  function applyFactor(attackingType: string, factor: number) {
    multiplierByAttackingType[attackingType] =
      (multiplierByAttackingType[attackingType] ?? 1) * factor
  }

  for (const defenseType of defenseTypes) {
    const { double_damage_from, half_damage_from, no_damage_from } =
      defenseType.damage_relations
    double_damage_from.forEach((type) => applyFactor(type.name, 2))
    half_damage_from.forEach((type) => applyFactor(type.name, 0.5))
    no_damage_from.forEach((type) => applyFactor(type.name, 0))
  }

  return Object.entries(multiplierByAttackingType)
    .filter(([, multiplier]) => multiplier > 1)
    .sort(([, firstMultiplier], [, secondMultiplier]) => secondMultiplier - firstMultiplier)
    .map(([attackingType]) => attackingType)
}
