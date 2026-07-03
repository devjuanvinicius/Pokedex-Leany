import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  ALL_TYPE_NAMES,
  getTypeTextColor,
  translateTypeName,
} from '../lib/pokemon'
import { useListPreferencesStore } from '../store/useListPreferencesStore'

function TypeFilterDropdown() {
  const selectedType = useListPreferencesStore((state) => state.selectedType)
  const setSelectedType = useListPreferencesStore(
    (state) => state.setSelectedType,
  )
  const [isOpen, setIsOpen] = useState(false)

  function handleSelect(typeName: string | null) {
    setSelectedType(typeName)
    setIsOpen(false)
  }

  return (
    <div className="flex-1">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-between gap-2 rounded-xl bg-surface-strong px-4 py-2.5 text-sm font-semibold text-white"
      >
        {selectedType ? translateTypeName(selectedType) : 'Todos os tipos'}
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="animate-sheet-up relative z-10 mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white px-5 pb-8 pt-3">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/20" />
            <h2 className="mb-5 text-center text-lg font-bold text-black">
              Selecione o tipo
            </h2>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className="rounded-full bg-surface-strong py-3 text-sm font-semibold text-white"
              >
                Todos os tipos
              </button>

              {ALL_TYPE_NAMES.map((typeName) => (
                <button
                  key={typeName}
                  type="button"
                  onClick={() => handleSelect(typeName)}
                  className="rounded-full py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: `var(--color-type-${typeName})`,
                    color: getTypeTextColor(typeName),
                  }}
                >
                  {translateTypeName(typeName)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default TypeFilterDropdown
