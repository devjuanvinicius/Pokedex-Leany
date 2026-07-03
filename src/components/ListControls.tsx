import TypeFilterDropdown from './TypeFilterDropdown'
import SortDropdown from './SortDropdown'

export default function ListControls() {
  return (
    <div className="flex gap-3">
      <TypeFilterDropdown />
      <SortDropdown />
    </div>
  )
}