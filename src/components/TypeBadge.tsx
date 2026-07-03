import { translateTypeName } from '../lib/pokemon'

interface TypeBadgeProps {
  typeName: string
  iconOnly?: boolean
}

function TypeBadge({ typeName, iconOnly = false }: TypeBadgeProps) {
  const iconCircle = (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
      <img
        src={`/types/${typeName}.svg`}
        alt=""
        aria-hidden="true"
        className="h-3 w-3"
      />
    </span>
  )

  if (iconOnly) {
    return (
      <span
        className="inline-flex items-center rounded-full p-0.5"
        style={{ backgroundColor: `var(--color-type-${typeName})` }}
        title={translateTypeName(typeName)}
      >
        {iconCircle}
      </span>
    )
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full py-0.5 pr-3 pl-0.5 text-xs font-semibold text-black"
      style={{ backgroundColor: `var(--color-type-${typeName})` }}
    >
      {iconCircle}
      {translateTypeName(typeName)}
    </span>
  )
}

export default TypeBadge
