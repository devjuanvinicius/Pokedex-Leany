import TypeFilterDropdown from './TypeFilterDropdown'
import SortDropdown from './SortDropdown'

function ListControls() {
  return (
    <div className="flex gap-3">
      <TypeFilterDropdown />
      <SortDropdown />
    </div>
  )
}

export default ListControls
