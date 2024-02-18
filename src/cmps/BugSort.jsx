export function BugSort({ sort, onSetSort }) {
  const { sortBy, sortDir } = sort

  const handleSortByChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target

    onSetSort({ ...sort, sortBy: typeof value === 'number' ? +value : value})
  }

  const handleSortDirChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target

    onSetSort({ ...sort, sortDir: +value})
  }

  return (
    <form>
      <label>Sort By: </label>
      <select id="selectSortBy" value={sortBy} onChange={handleSortByChange}>
        <option value="-1">No set</option>
        <option value="title">Title</option>
        <option value="description">Description</option>
        <option value="severity">Severity</option>
        <option value="createdAt">Created At</option>
      </select>
      <label> Sort Direction: </label>
      <select id="selectSortDir" value={sortDir} onChange={handleSortDirChange}>
        <option value="1">No set</option>
        <option value="1">Ascending</option>
        <option value="-1">Descending</option>
      </select>
    </form> 
  )
}
