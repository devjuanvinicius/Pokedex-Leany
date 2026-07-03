import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  useListPreferencesStore,
  type SortOrder,
} from '../store/useListPreferencesStore'

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'number-asc', label: 'Menor número' },
  { value: 'number-desc', label: 'Maior número' },
]

function SortDropdown() {
  const sortOrder = useListPreferencesStore((state) => state.sortOrder)
  const setSortOrder = useListPreferencesStore((state) => state.setSortOrder)
  const [isOpen, setIsOpen] = useState(false)

  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === sortOrder)?.label ?? ''

  function handleSelect(value: SortOrder) {
    setSortOrder(value)
    setIsOpen(false)
  }

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-2 rounded-xl bg-surface-strong px-4 py-2.5 text-sm font-semibold text-white"
      >
        {currentLabel}
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen ? (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-full z-20 mt-2 flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2.5 text-left text-sm font-medium hover:bg-black/5 ${
                  option.value === sortOrder ? 'text-text' : 'text-text-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default SortDropdown
