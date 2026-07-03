import { translateTypeName } from '../lib/pokemon'

interface TypeBadgeProps {
  typeName: string
}

/**
 * Pill colorida com a cor do próprio tipo (fonte: Figma): um círculo branco com
 * o ícone do elemento (na cor do tipo), seguido do nome do tipo em português.
 */
function TypeBadge({ typeName }: TypeBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full py-0.5 pr-3 pl-0.5 text-xs font-semibold text-black"
      style={{ backgroundColor: `var(--color-type-${typeName})` }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
        <img
          src={`/types/${typeName}.svg`}
          alt=""
          aria-hidden="true"
          className="h-3 w-3"
        />
      </span>
      {translateTypeName(typeName)}
    </span>
  )
}

export default TypeBadge
