export function BugPaging({ paging, filterBy, onSetFilter }) {
  const { pageIdx } = filterBy

  const hasPaging = pageIdx !== undefined

  const handleChangePageIdx = (ev, value) => {
    ev.preventDefault()
    ev.stopPropagation()

    onSetFilter({ ...filterBy, pageIdx: value })
    
  }

  const currentPage = filterBy.pageIdx + 1
  const pageDownDisables = !paging || currentPage <= 1
  const pageUpDisables = !paging || currentPage >= paging.maxPages

  return (
    <section className='paging'>
      <label>Use paging: <input type="checkbox" checked={hasPaging} onChange={(event) => handleChangePageIdx(event, hasPaging ? undefined : 0)} /></label>
      {hasPaging && <>
        <button onClick={(event) => handleChangePageIdx(event, filterBy.pageIdx - 1)} disabled={pageDownDisables}>-</button>
        <span>{currentPage}</span>
        <button onClick={(event) => handleChangePageIdx(event, filterBy.pageIdx + 1)} disabled={pageUpDisables}>+</button>
      </>}
    </section>
  )
}
