import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
      <Search size={18} className="text-text-muted" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar Pokémon..."
        aria-label="Pesquisar Pokémon"
        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
      />
    </div>
  )
}

export default SearchBar
