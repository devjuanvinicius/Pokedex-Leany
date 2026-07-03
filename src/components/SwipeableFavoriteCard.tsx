import { useRef, useState } from 'react'
import type { MouseEvent, PointerEvent } from 'react'
import { Trash2 } from 'lucide-react'
import { useFavoritesStore } from '../store/useFavoritesStore'
import PokemonCard from './PokemonCard'

/** Largura (px) da faixa vermelha revelada ao arrastar o card para a esquerda. */
const REVEAL_WIDTH = 88

interface SwipeableFavoriteCardProps {
  favoriteId: number
}

/**
 * Card de favorito com gesto de arrastar-para-remover: arrastar para a esquerda
 * (toque ou mouse) revela uma faixa com lixeira que remove o Pokémon dos
 * favoritos. O botão de coração do próprio card também remove.
 */
function SwipeableFavoriteCard({ favoriteId }: SwipeableFavoriteCardProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const isOpenRef = useRef(false)
  const startXRef = useRef(0)
  const hasMovedRef = useRef(false)

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    startXRef.current = event.clientX
    hasMovedRef.current = false
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging) return
    const deltaX = event.clientX - startXRef.current
    if (Math.abs(deltaX) > 5) hasMovedRef.current = true
    const base = isOpenRef.current ? -REVEAL_WIDTH : 0
    setOffset(Math.min(0, Math.max(-REVEAL_WIDTH, base + deltaX)))
  }

  function handlePointerUp() {
    setIsDragging(false)
    const shouldOpen = offset < -REVEAL_WIDTH / 2
    isOpenRef.current = shouldOpen
    setOffset(shouldOpen ? -REVEAL_WIDTH : 0)
  }

  // Evita disparar a navegação do card quando o ponteiro foi arrastado.
  function suppressClickAfterDrag(event: MouseEvent<HTMLDivElement>) {
    if (hasMovedRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => toggleFavorite(favoriteId)}
        aria-label="Remover dos favoritos"
        className="absolute inset-y-0 right-0 flex items-center justify-center bg-[#CD3131] text-white"
        style={{ width: REVEAL_WIDTH }}
      >
        <Trash2 size={24} aria-hidden="true" />
      </button>

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClickCapture={suppressClickAfterDrag}
        style={{ transform: `translateX(${offset}px)`, touchAction: 'pan-y' }}
        className={`relative ${isDragging ? '' : 'transition-transform'}`}
      >
        <PokemonCard nameOrId={String(favoriteId)} />
      </div>
    </div>
  )
}

export default SwipeableFavoriteCard
