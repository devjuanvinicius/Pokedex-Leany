import { ChevronDown } from 'lucide-react'

interface ControlButtonProps {
  label: string
}

function ControlButton({ label }: ControlButtonProps) {
  return (
    <button
      type="button"
      disabled
      className="flex flex-1 items-center justify-between gap-2 rounded-xl bg-surface-strong px-4 py-2.5 text-sm font-medium text-white"
    >
      {label}
      <ChevronDown size={16} className="text-white/70" aria-hidden="true" />
    </button>
  )
}

/**
 * Dropdowns de filtro por tipo e de ordenação. Apenas visual nesta fase — a
 * lógica de filtragem/ordenação é implementada na Fase 6.
 */
function ListControls() {
  return (
    <div className="flex gap-3">
      <ControlButton label="Todos os tipos" />
      <ControlButton label="Menor número" />
    </div>
  )
}

export default ListControls
