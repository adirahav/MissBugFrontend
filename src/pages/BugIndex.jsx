import { useState, useEffect, useCallback } from 'react'
import { jsPDF } from 'jspdf'
import { BugList } from '../cmps/BugList.jsx'
import { BugSort } from '../cmps/BugSort.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { utilService } from '../services/util.service.js'
import { BugPaging } from '../cmps/BugPaging.jsx'
import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [sort, setSortBy] = useState(bugService.getDefaultSort)
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter)
  const debouncedSetFilterBy = useCallback(utilService.debounce(onSetFilter, 500), [])

  useEffect(() => {
    loadBugs()
  }, [sort, filterBy])

  // bugs list
  async function loadBugs() {
    const bugs = await bugService.query(sort, filterBy)
    setBugs(bugs)
  }

  // pdf
  const downloadBugsPDF = async () => {
    const pdf = new jsPDF();

    var yosition = 10
    pdf.text('Bugs:', 10, yosition += 10)
    bugs.list.forEach(bug => {
      pdf.text(`Bug ${bug._id}`, 10, yosition += 20)
      pdf.text(`Title: ${bug.title}`, 20, yosition += 10)
      pdf.text(`Description: ${bug.desc}`, 20, yosition += 10)
      pdf.text(`Severity: ${bug.severity}`, 20, yosition += 10)
      pdf.text(`Labels: ${bug.labels.join(', ')}`, 20, yosition += 10)
    })

    pdf.save('bugs.pdf')
  }

  // remove bug
  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log('Deleted Succesfully!')
      setBugs(prevBugs => ({ ...prevBugs, list: prevBugs.list.filter((bug) => bug._id !== bugId) }))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.error('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  // create bug
  async function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      desc: prompt('Bug description?'),
      severity: +prompt('Bug severity?'),
      labels: prompt('Bug labels? (separate with \',\')'),
    }

    const bugToSave = {
      ...bug,
      labels: bug.labels.trim() !== "" ? bug.labels.split(',').map(label => label.trim()) : [],
    };

   
    try {
      const savedBug = await bugService.save(bugToSave)
      console.log('Added Bug', savedBug)
      console.log('Added Bug', bugs)
      setBugs(prevBugs => ({ ...prevBugs, list: [...prevBugs.list, savedBug] }))
      showSuccessMsg('Bug added')
    } catch (err) {
      console.error('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  // edit bug
  async function onEditBug(bug) {
    const desc = prompt('New description?')
    const severity = +prompt('New severity?')
    const labels = prompt('Bug labels? (separate by \',\')')
    const bugToSave = { 
      ...bug, 
      desc, 
      severity, 
      labels: labels.trim() !== "" ? labels.split(',').map(label => label.trim()) : [] 
    }
    console.log("bugToSave = " + JSON.stringify(bugToSave))
    try {

      const savedBug = await bugService.save(bugToSave)
      console.log('Updated Bug:', savedBug)
      setBugs(prevBugs => ({ ...prevBugs, list: prevBugs.list.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ) }))
      
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.error('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

  // sort
  function onSetSort(newSort) {
    setSortBy(newSort);
  }

  // filter
  function onSetFilter(newFilter) {
    setFilterBy(newFilter);
  }

  // paging
  const onSetPaging = (newFilter) => {
    setFilterBy(newFilter)
  }
  
  if (!bugs || bugs.length == 0) return <div>Loading...</div>
  
  return (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <main>
        <BugPaging paging={bugs.paging} filterBy={filterBy} onSetFilter={onSetPaging} />
        <button onClick={onAddBug}>Add Bug ⛐</button> <button onClick={downloadBugsPDF}>Download PDF</button> 
        <BugSort sort={sort} onSetSort={onSetSort} />
        <BugFilter filterBy={filterBy} onSetFilter={debouncedSetFilterBy} />
        <BugList bugs={bugs.list} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
