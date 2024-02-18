import { useEffect, useState } from "react"

export function BugFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const { severity, minSeverity, txt, labels } = filterByToEdit

  const handleSearchChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target
    setFilterByToEdit({ ...filterByToEdit, txt: value })
  }

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  const handleSeverityChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target

    setFilterByToEdit({ ...filterByToEdit, severity: +value })
  }

  const handleMinSeverityChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target
    setFilterByToEdit({ ...filterByToEdit, minSeverity: +value })
  }

  const handleLabelChange = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()

    let { value } = ev.target
    setFilterByToEdit({ ...filterByToEdit, labels: value })
  }

  return (
    <form>
      <label>Filter By: </label>
      <input type="text" placeholder="Search" onChange={handleSearchChange} id="search" value={txt} name="search" />
      
      <label> Severity: </label>
      <select id="selectSeverity" value={severity} onChange={handleSeverityChange}>
        <option value="-1">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label> Min Severity: </label>
      <select id="selectMinSeverity" value={minSeverity} onChange={handleMinSeverityChange}>
        <option value="-1">All</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label> Labels: </label>
      <input type="text" placeholder="Labels (separate with ',')" onChange={handleLabelChange} id="labels" value={labels} name="labels" />
    </form> 
  )
}
