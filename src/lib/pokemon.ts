import type { Pokemon } from '../types/pokeapi'

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
