import { Search } from 'lucide-react'

/**
 * Barra de busca da listagem. Apenas visual nesta fase — a filtragem por nome
 * é implementada na Fase 6 (busca e filtros).
 */
function SearchBar() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3">
      <Search size={18} className="text-text-muted" aria-hidden="true" />
      <input
        type="search"
        disabled
        placeholder="Pesquisar Pokémon..."
        aria-label="Pesquisar Pokémon"
        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
      />
    </div>
  )
}

export default SearchBar
