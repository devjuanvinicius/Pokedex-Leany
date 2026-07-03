import { Link } from '@tanstack/react-router'
import { GitCompareArrows, Heart } from 'lucide-react'

/**
 * Barra de navegação inferior, compartilhada por todas as telas.
 *
 * Nesta fase apenas a aba "Pokédex" navega (rota `/`). As abas "Favoritos" e
 * "Comparar" são placeholders até suas rotas existirem (Fases 5 e 7).
 * O ícone da Pokédex usa a pokébola exportada do Figma; os demais usam lucide.
 * A estrutura definitiva de abas ainda será confirmada com o time de design.
 */
function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-background">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-6 py-3">
        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-xs font-medium text-text"
        >
          <img
            src="/Property%201=Default-2.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6"
          />
          Pokédex
        </Link>

        <button
          type="button"
          disabled
          className="flex flex-col items-center gap-1 text-xs font-medium text-text-muted"
        >
          <Heart size={22} aria-hidden="true" />
          Favoritos
        </button>

        <button
          type="button"
          disabled
          className="flex flex-col items-center gap-1 text-xs font-medium text-text-muted"
        >
          <GitCompareArrows size={22} aria-hidden="true" />
          Comparar
        </button>
      </div>
    </nav>
  )
}

export default BottomNav
