
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            console.log(err.response.data)
            showErrorMsg('Cannot load bug')
            navigate('/bug')
        }
    }

    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details main-layout">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        {bug.description && <p>Description: <span>{bug.description}</span></p>}
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Labels: <span>{bug.labels.map(label => `"${label}"`).join(', ')}</span></p>
        <Link to="/bug">Back to List</Link>
    </div>

}

