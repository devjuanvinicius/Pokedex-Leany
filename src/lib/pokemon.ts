import type {
  EvolutionChainLink,
  Pokemon,
  PokemonSpecies,
  TypeResponse,
} from '../types/pokeapi'

export function formatPokemonNumber(pokemonId: number): string {
  return pokemonId.toString().padStart(3, '0')
}

export function getPokemonArtwork(pokemon: Pokemon): string {
  const officialArtwork = pokemon.sprites.other?.['official-artwork']?.front_default
  return officialArtwork ?? pokemon.sprites.front_default ?? ''
}

export function capitalize(text: string): string {
  if (text.length === 0) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Traduções dos tipos para português.
 *
 * A PokeAPI declara o idioma `pt-br` no endpoint /language, porém os dados
 * localizados em pt-br não estão preenchidos: o campo `names` de /type/{id}
 * traz apenas ja/ko/zh/fr/de/es/it/en (sem pt-br em nenhum tipo). Por isso
 * mantemos este mapa estático (chaves = slugs em inglês da API).
 * Fallback: capitaliza o slug original.
 */
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

/**
 * Nomes das estatísticas base em português (chaves = slugs da PokeAPI).
 */
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

/**
 * A PokeAPI expõe altura em decímetros e peso em hectogramas.
 * Convertemos para as unidades usuais (metros e quilogramas).
 */
export function formatHeight(heightInDecimeters: number): string {
  return `${(heightInDecimeters / 10).toFixed(1).replace('.', ',')} m`
}

export function formatWeight(weightInHectograms: number): string {
  return `${(weightInHectograms / 10).toFixed(1).replace('.', ',')} kg`
}

export interface EvolutionStep {
  speciesName: string
  /** Nível mínimo para chegar a esta espécie; null para a forma base. */
  minLevel: number | null
}

/**
 * Achata a cadeia de evolução (estrutura recursiva da PokeAPI) numa lista
 * ordenada de espécies, cada uma com o nível necessário para alcançá-la.
 * Percorre também ramificações (ex.: Eevee), listando-as em sequência.
 */
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

/**
 * Texto descritivo (flavor text) em inglês, com os caracteres de controle
 * (quebras de linha e form feed) normalizados para espaços. A PokeAPI não
 * fornece descrição em pt-br. Retorna string vazia se não houver entrada.
 */
export function getEnglishFlavorText(species: PokemonSpecies): string {
  const englishEntry = species.flavor_text_entries.find(
    (entry) => entry.language.name === 'en',
  )
  return englishEntry ? englishEntry.flavor_text.replace(/\s+/g, ' ').trim() : ''
}

/**
 * Categoria (genus) do Pokémon em inglês, sem o sufixo " Pokémon".
 * Ex.: "Seed Pokémon" -> "Seed". Não há genus em pt-br na PokeAPI.
 */
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

/**
 * Converte o gender_rate (fêmeas em oitavos) em percentuais. Retorna null
 * para Pokémon sem gênero (gender_rate === -1).
 */
export function getGenderRatio(genderRate: number): GenderRatio | null {
  if (genderRate < 0) return null
  const femalePercentage = (genderRate / 8) * 100
  return { malePercentage: 100 - femalePercentage, femalePercentage }
}

/** Formata um percentual no padrão pt-br (vírgula decimal). Ex.: 87.5 -> "87,5%". */
export function formatPercentage(value: number): string {
  return `${value.toString().replace('.', ',')}%`
}

/**
 * Calcula as fraquezas de um Pokémon a partir das relações de dano dos seus
 * tipos: multiplica os fatores (2x, 0.5x, 0x) de cada tipo defensor por tipo
 * atacante e retorna os tipos com efetividade final maior que 1, do mais
 * efetivo para o menos.
 */
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
