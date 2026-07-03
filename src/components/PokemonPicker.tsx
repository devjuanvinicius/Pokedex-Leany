import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAllPokemon } from '../hooks/useAllPokemon'
import { capitalize, formatPokemonNumber } from '../lib/pokemon'

interface PokemonPickerProps {
  onSelect: (name: string) => void
}

function PokemonPicker({ onSelect }: PokemonPickerProps) {
  const { data: allPokemon } = useAllPokemon()
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()
  const suggestions = normalizedQuery
    ? (allPokemon ?? [])
        .filter((pokemon) => pokemon.name.includes(normalizedQuery))
        .slice(0, 8)
    : []

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 rounded-xl border border-border px-3 py-2">
        <Search size={16} className="text-text-muted" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Escolher Pokémon..."
          aria-label="Escolher Pokémon"
          className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
        />
      </div>

      {suggestions.length > 0 ? (
        <div className="flex flex-col overflow-hidden rounded-xl border border-border">
          {suggestions.map((pokemon) => (
            <button
              key={pokemon.id}
              type="button"
              onClick={() => onSelect(pokemon.name)}
              className="flex items-center justify-between px-3 py-2 text-left text-sm text-text hover:bg-black/5"
            >
              {capitalize(pokemon.name)}
              <span className="text-xs text-text-muted">
                N°{formatPokemonNumber(pokemon.id)}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default PokemonPicker
