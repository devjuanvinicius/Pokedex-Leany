import { Link, useLocation } from '@tanstack/react-router'
import { GitCompareArrows } from 'lucide-react'

const POKEDEX_ICON = {
  active: '/pokedex-tab-active.svg',
  inactive: '/pokedex-tab-inactive.svg',
}
const FAVORITES_ICON = {
  active: '/favorites-tab-active.svg',
  inactive: '/favorites-tab-inactive.svg',
}

const tabBaseClassName = 'flex flex-col items-center gap-1 text-xs font-medium'

function TabIcon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" className="h-6 w-6" />
}

function BottomNav() {
  const pathname = useLocation({ select: (location) => location.pathname })
  const isPokedexActive = pathname === '/'
  const isFavoritesActive = pathname.startsWith('/favoritos')

  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-30 border-t border-black/10">
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

        <Link
          to="/favoritos"
          className={tabBaseClassName}
          activeProps={{ className: 'text-text' }}
          inactiveProps={{ className: 'text-text-muted' }}
        >
          <TabIcon
            src={
              isFavoritesActive
                ? FAVORITES_ICON.active
                : FAVORITES_ICON.inactive
            }
          />
          Favoritos
        </Link>

        <Link
          to="/comparar"
          className={tabBaseClassName}
          activeProps={{ className: 'text-text' }}
          inactiveProps={{ className: 'text-text-muted' }}
        >
          <GitCompareArrows size={24} aria-hidden="true" />
          Comparar
        </Link>
      </div>
    </nav>
  )
}

export default BottomNav
