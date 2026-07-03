import { Link, useLocation } from '@tanstack/react-router'

/**
 * Ícones das abas em dois estados (exportados do Figma em public/):
 * `inactive` = contorno (aba não selecionada), `active` = colorido (aba atual).
 */
const POKEDEX_ICON = {
  active: '/Property%201=Default.svg',
  inactive: '/Property%201=Variant2.svg',
}
const FAVORITES_ICON = {
  active: '/Property%201=Default-1.svg',
  inactive: '/Property%201=Variant2-1.svg',
}
const REGIONS_ICON_INACTIVE = '/Property%201=Variant2-2.svg'

const tabBaseClassName = 'flex flex-col items-center gap-1 text-xs font-medium'

function TabIcon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" className="h-6 w-6" />
}

/**
 * Barra de navegação inferior. Pokédex (`/`) e Favoritos (`/favoritos`) navegam
 * e trocam o ícone para a versão colorida quando estão na página atual.
 * "Regiões" é um placeholder desabilitado (fora do escopo do desafio), exibido
 * sempre no estado de contorno.
 */
function BottomNav() {
  const pathname = useLocation({ select: (location) => location.pathname })
  const isPokedexActive = pathname === '/'
  const isFavoritesActive = pathname.startsWith('/favoritos')

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-background">
      <div className="mx-auto flex max-w-2xl items-center justify-around px-6 py-3">
        <Link
          to="/"
          className={tabBaseClassName}
          activeProps={{ className: 'text-text' }}
          inactiveProps={{ className: 'text-text-muted' }}
          activeOptions={{ exact: true }}
        >
          <TabIcon
            src={isPokedexActive ? POKEDEX_ICON.active : POKEDEX_ICON.inactive}
          />
          Pokédex
        </Link>

        <button
          type="button"
          disabled
          className={`${tabBaseClassName} text-text-muted`}
        >
          <TabIcon src={REGIONS_ICON_INACTIVE} />
          Regiões
        </button>

        <Link
          to="/favoritos"
          className={tabBaseClassName}
          activeProps={{ className: 'text-text' }}
          inactiveProps={{ className: 'text-text-muted' }}
        >
          <TabIcon
            src={
              isFavoritesActive ? FAVORITES_ICON.active : FAVORITES_ICON.inactive
            }
          />
          Favoritos
        </Link>
      </div>
    </nav>
  )
}

export default BottomNav
