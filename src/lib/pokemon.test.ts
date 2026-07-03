import { describe, expect, it } from 'vitest'
import {
  computeWeaknesses,
  formatHeight,
  formatPercentage,
  formatPokemonNumber,
  formatWeight,
  getEnglishFlavorText,
  getEnglishGenus,
  getEvolutionSteps,
  getGenderRatio,
  getPokemonIdFromUrl,
  getTypeTextColor,
  translateStatName,
  translateTypeName,
} from './pokemon'
import type {
  EvolutionChainLink,
  PokemonSpecies,
  TypeResponse,
} from '../types/pokeapi'

describe('formatação', () => {
  it('formata o número com 3 dígitos', () => {
    expect(formatPokemonNumber(1)).toBe('001')
    expect(formatPokemonNumber(25)).toBe('025')
    expect(formatPokemonNumber(150)).toBe('150')
  })

  it('converte altura (dm) e peso (hg) com vírgula pt-br', () => {
    expect(formatHeight(7)).toBe('0,7 m')
    expect(formatWeight(69)).toBe('6,9 kg')
  })

  it('formata percentual com vírgula', () => {
    expect(formatPercentage(87.5)).toBe('87,5%')
  })

  it('extrai o id de uma URL de recurso', () => {
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/type/12')).toBe(12)
  })
})

describe('traduções', () => {
  it('traduz tipos para português com fallback', () => {
    expect(translateTypeName('grass')).toBe('Grama')
    expect(translateTypeName('poison')).toBe('Venenoso')
    expect(translateTypeName('desconhecido')).toBe('Desconhecido')
  })

  it('traduz nomes de status', () => {
    expect(translateStatName('special-attack')).toBe('Ataque Esp.')
    expect(translateStatName('speed')).toBe('Velocidade')
  })

  it('define texto branco para tipos escuros e preto para claros', () => {
    expect(getTypeTextColor('water')).toBe('#ffffff')
    expect(getTypeTextColor('dragon')).toBe('#ffffff')
    expect(getTypeTextColor('electric')).toBe('#000000')
    expect(getTypeTextColor('fire')).toBe('#000000')
  })
})

describe('getGenderRatio', () => {
  it('converte gender_rate em percentuais', () => {
    expect(getGenderRatio(1)).toEqual({
      malePercentage: 87.5,
      femalePercentage: 12.5,
    })
  })

  it('retorna null para Pokémon sem gênero', () => {
    expect(getGenderRatio(-1)).toBeNull()
  })
})

describe('computeWeaknesses', () => {
  const grass: TypeResponse = {
    damage_relations: {
      double_damage_from: [
        { name: 'fire', url: '' },
        { name: 'ice', url: '' },
        { name: 'flying', url: '' },
        { name: 'bug', url: '' },
        { name: 'poison', url: '' },
      ],
      half_damage_from: [
        { name: 'water', url: '' },
        { name: 'grass', url: '' },
        { name: 'electric', url: '' },
        { name: 'ground', url: '' },
      ],
      no_damage_from: [],
    },
    pokemon: [],
  }
  const poison: TypeResponse = {
    damage_relations: {
      double_damage_from: [
        { name: 'ground', url: '' },
        { name: 'psychic', url: '' },
      ],
      half_damage_from: [
        { name: 'grass', url: '' },
        { name: 'bug', url: '' },
        { name: 'poison', url: '' },
      ],
      no_damage_from: [],
    },
    pokemon: [],
  }

  it('combina relações de dano e retorna só efetividade > 1x', () => {
    const weaknesses = computeWeaknesses([grass, poison]).sort()
    expect(weaknesses).toEqual(['fire', 'flying', 'ice', 'psychic'])
  })
})

describe('getEvolutionSteps', () => {
  it('achata a cadeia com os níveis de cada evolução', () => {
    const chain: EvolutionChainLink = {
      species: { name: 'bulbasaur', url: '' },
      evolution_details: [],
      evolves_to: [
        {
          species: { name: 'ivysaur', url: '' },
          evolution_details: [
            { min_level: 16, trigger: { name: 'level-up', url: '' }, item: null },
          ],
          evolves_to: [
            {
              species: { name: 'venusaur', url: '' },
              evolution_details: [
                {
                  min_level: 32,
                  trigger: { name: 'level-up', url: '' },
                  item: null,
                },
              ],
              evolves_to: [],
            },
          ],
        },
      ],
    }
    expect(getEvolutionSteps(chain)).toEqual([
      { speciesName: 'bulbasaur', minLevel: null },
      { speciesName: 'ivysaur', minLevel: 16 },
      { speciesName: 'venusaur', minLevel: 32 },
    ])
  })
})

describe('descrição e categoria (inglês)', () => {
  const species = {
    flavor_text_entries: [
      { flavor_text: 'A strange\nseed.', language: { name: 'en', url: '' } },
      { flavor_text: 'Uma semente.', language: { name: 'es', url: '' } },
    ],
    genera: [{ genus: 'Seed Pokémon', language: { name: 'en', url: '' } }],
  } as unknown as PokemonSpecies

  it('pega o flavor text em inglês normalizando espaços', () => {
    expect(getEnglishFlavorText(species)).toBe('A strange seed.')
  })

  it('pega a categoria em inglês sem o sufixo Pokémon', () => {
    expect(getEnglishGenus(species)).toBe('Seed')
  })
})
