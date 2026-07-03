import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SortOrder = 'number-asc' | 'number-desc'

interface ListPreferencesState {
  selectedType: string | null
  sortOrder: SortOrder
  setSelectedType: (typeName: string | null) => void
  setSortOrder: (sortOrder: SortOrder) => void
}

export const useListPreferencesStore = create<ListPreferencesState>()(
  persist(
    (set) => ({
      selectedType: null,
      sortOrder: 'number-asc',
      setSelectedType: (typeName) => set({ selectedType: typeName }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
    }),
    {
      name: 'pokedex-list-preferences',
    },
  ),
)
