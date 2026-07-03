/**
 * Placeholder exibido enquanto o detalhe do Pokémon está sendo carregado,
 * mantendo a mesma altura do card real para evitar saltos de layout.
 */
export default function PokemonCardSkeleton() {
  return (
    <div
      className="h-24 animate-pulse rounded-2xl bg-black/5"
      aria-hidden="true"
    />
  )
}
